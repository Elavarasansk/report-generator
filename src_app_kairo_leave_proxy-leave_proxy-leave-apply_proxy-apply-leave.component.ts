import { Store } from '@ngrx/store';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import KEY from 'src/app/common/constants/storeKeys';
import DateUtils from 'src/app/common/utility/dateUtils';
import DateUtlity from 'src/app/common/utility/date.utility';
import { SetError } from 'src/app/common/reduxFlow/actions/overall.action';
import { LeaveRequestPageStore , RootStore } from 'src/app/common/reduxFlow/root.state';

import { ApplyProxyLeaveReqDto } from 'src/app/common/reduxFlow/interfaces/req/leave-request.ireq';
import { ApplyProxyLeave, FetchLeaveMasterDetails,ApplyProxyOdLeave } from 'src/app/common/reduxFlow/actions/leave-request.action';
import LeaveRequestService from 'src/app/common/reduxFlow/services/leave-request.service';

const formResetValue = {
  toDate: null, endNoon: null,
  fromDate: null, startNoon: null,
  leaveReason: null, noOfDays: null
}
const leaveBalanceConst: any = {};
const specificAllotmentSetting: any = {};

const FULLDAY = "FULLDAY";
const FORENOON = "FORENOON";
const AFTERNOON = "AFTERNOON";

@Component({
  selector: 'app-proxy-apply-leave',
  templateUrl: './proxy-apply-leave.component.html',
  styleUrls: ['./proxy-apply-leave.component.css']
})
export class ProxyApplyLeaveComponent implements OnInit{

  @Input()selectedUserData:any;

  leaveApplicationForm!: FormGroup;
  leaveApplicationReq: ApplyProxyLeaveReqDto;

  disabledDate: any;
  isClosed: boolean = true;


  selectedLeave: String;
  public leaveDaysinfo: object = {
    applied: null,
    holiday: null,
    working: null,
    leaveTypeBalance: null
  }

  leaveBalanceInfo = {};
  metaData = {
    leaveType: [],
    leaveBalance: leaveBalanceConst,
    specificAllotmentSetting: specificAllotmentSetting,
    holidaysRange: [],
    workingDayRange: [],
  }
  openModal = false;
  isSameFromToDate = true;
  isErrorOccured = false;
  restrictToDate: boolean = true;
  isZeroLeaveBalance: boolean = true;
  currentRestrictedToDate: Date;

  constructor(private fb: FormBuilder, private dateUtility: DateUtlity,
    private dateUtils: DateUtils,
    private store: Store<RootStore>,
    private leaveRequestStore: Store<LeaveRequestPageStore>, private leaveRequestService:LeaveRequestService) {
  }

  actualPageSubscription = () => {
    this.leaveRequestStore.dispatch(new FetchLeaveMasterDetails(null));
    if(this.selectedUserData){
      const {userId} = this.selectedUserData;
      return this.leaveRequestService.fetchLeaveBalanceByUserid(userId).subscribe(result=> {
        console.log(result);
        this.metaData.leaveBalance = result;
        this.metaData.leaveType = result? Object.keys(result.leaveAlloted).sort():[];
        this.metaData.leaveType.push('ON-DUTY_LEAVE');
        this.leaveBasedBalanceByTypes();
        this.isClosed = false;
      })
    }
  }

  leaveBasedBalanceByTypes = () => {
    const leaveBalanceInfo = {};
    if (!this.metaData.leaveBalance) {
      return;
    }
    const { leaveAlloted, leaveApplied, leaveUtilized } = this.metaData.leaveBalance;
    Object.keys(leaveAlloted).forEach(e => {
      const allotted = leaveAlloted[e];
      const applied = leaveApplied[e] ? leaveApplied[e] : 0;
      const utilzed = leaveUtilized[e] ? leaveUtilized[e] : 0;

      const balance = (allotted - utilzed - applied);
      leaveBalanceInfo[e] = balance;
    });
    this.leaveBalanceInfo = leaveBalanceInfo;
  }

  ngOnInit(): void {
    this.resetForm();
    this.checkForSameStartEndDates();
  }

  showModal(flag): void {
    if(flag){
      this.actualPageSubscription()
    }
  }

  onCancel(){
    this.showModal(false);
    this.afterClosingModal();
  }

  afterClosingModal() {
   this.leaveApplicationForm.reset();
   this.isClosed = true;
  }

  resetForm(){
    this.leaveApplicationForm = this.fb.group({
      type: [null, [Validators.required]],
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
      startNoon: [null, [Validators.required]],
      endNoon: [null, [Validators.required]],
      noOfDays: [null, [Validators.required]],
      leaveReason: [null, [Validators.required]],
    });
  }

  checkForSameStartEndDates() {
    const { fromDate, toDate, startNoon } = this.leaveApplicationForm.value;
    const from = this.dateUtility.getSqlFormatDatedString(fromDate);
    const to = this.dateUtility.getSqlFormatDatedString(toDate);
    this.isSameFromToDate = (from === to);
    if (startNoon && this.isSameFromToDate) {
      this.leaveApplicationForm.patchValue({ endNoon: startNoon });
    }
  }

  submitForm(): void {
    let { type, startNoon, noOfDays, fromDate, toDate } = this.leaveApplicationForm.value;
    const {  noOfPastMonths , currentMonthBuffer } = this.metaData.specificAllotmentSetting ;
    if(this.dateUtility.isPreviousMonthCanBeApplied(fromDate , noOfPastMonths , currentMonthBuffer)){
      this.leaveRequestStore.dispatch(new SetError({ errorTitle: `Leave cannot be applied for previous month.` }));
      return;
    }

    if (this.isSameFromToDate) {
      this.leaveApplicationForm.patchValue({ endNoon: startNoon });
    }
    for (const i in this.leaveApplicationForm.controls) {
      this.leaveApplicationForm.controls[i].markAsDirty();
      this.leaveApplicationForm.controls[i].updateValueAndValidity();
    }
    fromDate = this.dateUtility.getSqlFormatDatedString(fromDate);
    toDate = this.dateUtility.getSqlFormatDatedString(toDate);

    const { leaveApplicationForm } = this;
    this.leaveApplicationReq = Object.assign( leaveApplicationForm.value , { fromDate , toDate } )

    if (noOfDays > this.leaveBalanceInfo[type]) {
      this.leaveRequestStore.dispatch(new SetError({ errorTitle: `Error: Leave(s) cannot be applied more than available Leave Balance` }));
      return;
    }
    const { release } = this.metaData.specificAllotmentSetting;
    const validFromYear = this.dateUtility.checkDateInCurrentYear(fromDate);
    const validToYear = this.dateUtility.checkDateInCurrentYear(toDate)  ||  release === "IMMEDIATE" ;
    if (!validFromYear || !validToYear) {
      this.leaveApplicationForm.patchValue({ fromDate: null });
      this.leaveRequestStore.dispatch(new SetError({ errorTitle: `Leaves can be applied only for this year` }));
      return;
    }
    this.leaveApplicationReq.applicantUserId = this.selectedUserData.userId;
    if (noOfDays > 0) {
      if(type === 'ON-DUTY_LEAVE'){
        this.leaveRequestStore.dispatch(new ApplyProxyOdLeave(this.leaveApplicationReq));
      }
      else{
         this.leaveRequestStore.dispatch(new ApplyProxyLeave(this.leaveApplicationReq));
      }
    } else {
      this.leaveRequestStore.dispatch(new SetError({ errorTitle: 'Sorry, invalid request, check your From & To dates' }));
    }
  }

  public handleLeaveTypeChange(leaveType: string) {
    this.restrictToDate = false;
    this.leaveApplicationForm.patchValue(formResetValue);
    this.isZeroLeaveBalance = (this.leaveBalanceInfo[leaveType] <= 0);
    this.isErrorOccured = this.isZeroLeaveBalance;
    if (this.isZeroLeaveBalance) {
      this.leaveRequestStore.dispatch(new SetError({ errorTitle: 'Sorry, insufficient Balance' }));
      return;
    }
    if(leaveType !== 'ON-DUTY_LEAVE'){
       this.metaData.specificAllotmentSetting = this.dateUtility.getLeaveSettingsByType(leaveType);
    }
    this.restrictChangingToDate();
  }

  restrictChangingToDate = () => {
    const { minApplyLimit, maxApplyLimit } = this.metaData.specificAllotmentSetting;
    this.restrictToDate = (minApplyLimit && maxApplyLimit && (minApplyLimit === maxApplyLimit));
  }

  handleFromDateChange = () => {
    const { fromDate, startNoon } = this.leaveApplicationForm.value;
    const { minApplyLimit, considerHolidaysInCount } = this.metaData.specificAllotmentSetting;
    if (this.restrictToDate) {
      let toDate = null;
      if (considerHolidaysInCount) {
        toDate = this.dateUtility.getSuccessiveTargetDate(fromDate, minApplyLimit);
      } else {
        toDate = this.getToDateWithoutHolidays(fromDate, minApplyLimit);
      }
      this.leaveApplicationForm.patchValue({ toDate, noOfDays: minApplyLimit, endNoon: FULLDAY, startNoon: FULLDAY });
      return;
    }

    if (!startNoon) {
      this.leaveApplicationForm.patchValue({ startNoon: FULLDAY });
    }
    this.checkForSameStartEndDates();
    this.calculateNoOfDays();
  }

  getToDateWithoutHolidays = (fromDate, minApplyLimit) => {
    let currentToDate = this.dateUtility.getSuccessiveTargetDate(fromDate, minApplyLimit);
    let classifiedDays = this.dateUtility.classifyHolidaysAndworkingDays(fromDate, currentToDate);
    const { holidays, workingDays } = classifiedDays;
    this.currentRestrictedToDate = currentToDate
    if (workingDays.length < minApplyLimit) {
      let nextDay = this.dateUtility.getSuccessiveTargetDate(currentToDate, 2);
      this.getToDateWithoutHolidays(nextDay, holidays.length);
    }
    return this.currentRestrictedToDate;
  }

  handleToDateChange = () => {
    if (this.restrictToDate) {
      return;
    }
    this.checkForSameStartEndDates();
    const { endNoon } = this.leaveApplicationForm.value;
    if (!endNoon) {
      this.leaveApplicationForm.patchValue({ startNoon: FULLDAY });
    }
    this.calculateNoOfDays();
  }

  handleNoonChange = () => {
    if (this.restrictToDate) {
      return;
    }
    this.calculateNoOfDays();
  }

  calculateNoOfDays() {
    if(this.isClosed){
      return;
    }
    const { fromDate, toDate, startNoon, endNoon , type } = this.leaveApplicationForm.value;
    if (fromDate && toDate) {
      if (!this.dateUtility.isValidStartEndDate(fromDate, toDate)) {
        this.leaveApplicationForm.patchValue({ noOfDays: 0 });
        this.leaveRequestStore.dispatch(new SetError({ errorTitle: `Start-date should be greater than end-date` }));
        return;
      }
      let noOfDays;
      const { workingDays, holidays } = this.dateUtility.classifyHolidaysAndworkingDays(fromDate, toDate);
      this.metaData.holidaysRange = holidays;
      this.metaData.workingDayRange = workingDays;
      if (this.dateUtility.checkDateInList(fromDate, holidays) ||
        this.dateUtility.checkDateInList(toDate, holidays)) {
        this.leaveApplicationForm.patchValue({ noOfDays: 0 });
        this.leaveRequestStore.dispatch(new SetError({ errorTitle: `Start-end-dates are in holidays list` }));
        return;
      }
      noOfDays = workingDays.length;

      if (this.dateUtility.isStartEndDateEqual(fromDate, toDate)) {
        if ((startNoon === FORENOON) || (startNoon === AFTERNOON)) {
          noOfDays = noOfDays - 0.5;
        }
      } else {
        if (startNoon === AFTERNOON) {
          noOfDays = noOfDays - 0.5;
        }
        if (endNoon === FORENOON) {
          noOfDays = noOfDays - 0.5;
        }
      }
      this.leaveApplicationForm.patchValue({ noOfDays });
    }
  }

  handleReasonChange = ({ target }) => {
    let leaveReason = target.value;
    if (leaveReason.length > 200) {
      leaveReason = leaveReason.substring(0, 200);
      this.leaveApplicationForm.patchValue({ leaveReason });
    }
  }

  disableFutureDates = (current: Date): boolean => {
    const { toDate } = this.leaveApplicationForm.value;
    if(toDate){
      return this.dateUtility.disableFutureDates(current,toDate);
    }
  };

  disablePastDates = (current: Date): boolean => {
    const { fromDate } = this.leaveApplicationForm.value;
    if(fromDate){
      return this.dateUtility.disablePastDates(current,fromDate);
    }
  };

}
