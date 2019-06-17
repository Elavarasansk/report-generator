import React, { Component } from 'react';
import { AutoComplete,Row,Col,DatePicker,InputNumber,Select,Form,TimePicker,Button,Checkbox,Modal,Tooltip,Icon,Table,Input} from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import moment from 'moment';
const { RangePicker } = DatePicker;
const { Option } = Select;
const confirm = Modal.confirm;
const Search = Input.Search;


const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 8 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 16 },
		},
};

const tailFormItemLayout = {
		wrapperCol: {
			xs: {
				span: 24,
				offset: 0,
			},
			sm: {
				span: 16,
				offset: 8,
			},
		},
};


const columns = [
	{
		title: 'Name',
		dataIndex: 'name'
	}
	];

const data = [
	{
		key: '1',
		name: 'John Brown',
	},
	{
		key: '2',
		name: 'Jim Green',
	},
	{
		key: '3',
		name: 'Joe Black',
	},
	{
		key: '4',
		name: 'Disabled User',
	},
	{
		key: '5',
		name: 'Disabled User1',
	},
	{
		key: '6',
		name: 'Disabled User2',
	},
	];




class TestAssignment extends Component {

	constructor(props){
		super(props);
		this.state = {
				open: false,
				totalQuestion : 5,
				totalTimeTaken : "00:00:00",
				questionCount : 0,
				showCandidateModal : false,
				candidateList : data,
				selectedList : [],
				candidateAssignedList  : [] ,

		};
	}

	showModal = () => {
		this.setState({
			showCandidateModal: true,
		});
	};

	showConfirm = () => {
		confirm({
			width : 480,
			title: 'Are you sure do you want to assign the test?',
			centered : true,
			onOk() {
				console.log('OK');
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}

	calculateTotalTime = (expirationTime, questionCount) => {
		if(!expirationTime || questionCount <= 0 ){
			return "00:00:00"
		}
		let totalTime = expirationTime.clone();
		let timeSplit = expirationTime.format('HH:mm:ss').split(':');	   
		const hours = parseInt(timeSplit[0]) * questionCount;
		const minutes = parseInt(timeSplit[1]) * questionCount;
		const seconds = parseInt(timeSplit[2]) * questionCount;	   
		totalTime.set('hours' , hours );
		totalTime.set('minutes', minutes );
		totalTime.set('seconds' , seconds);
		this.setState( { totalTimeTaken :totalTime } ) ;
		return totalTime;
	}

	handleSubmit = e => {
		e.preventDefault();
		let param = {} ; 
		this.props.form.validateFields((err, values) => {
			if(err){
				return; 
			}
			Object.assign(param,values);
			let dataParam = param ;
			dataParam.testStartTime =  param.testdate ? param.testdate[0] :  param.testdate;
			dataParam.testEndTime = param.testdate ? param.testdate[1] : param.testdate;
			Object.assign(param,dataParam);
			delete dataParam.testdate;
			this.showConfirm();
		});		

	};

	handleOpenChange = open => {
		this.setState({ open });
	};

	handleClose = () => this.setState({ open: false });

	handleReset = () => {
		this.props.form.resetFields();
	};

	setAverageTimeTaken = (e) => {
		const {questionCount } =  this.state ;
		const totalTimeTaken  =	this.calculateTotalTime(e ,questionCount );

		this.props.form.setFields({
			totalTimeTaken: {
				value: totalTimeTaken
			}
		});
		this.setState( { avgTimeTaken : e });

	};

	setQuestionCount = (e) => {
		const {avgTimeTaken } =  this.state ;
		const totalTimeTaken  = this.calculateTotalTime(avgTimeTaken , e );		
		this.props.form.setFields({
			totalTimeTaken: {
				value: totalTimeTaken
			}
		});
		this.setState( { questionCount : e });

	};

	handleOk = e => {
		const { selectedList,candidateAssignedList } = this.state ;  
		const dataList = candidateAssignedList.concat(selectedList);
		this.props.form.setFields({
			candidate: {
				value: dataList
			}
		});		

		this.setState({
			showCandidateModal: false,
		});			
	};

	handleCancel = e => {
		this.setState({
			showCandidateModal: false,
		});
	};

	searchCandidateList = (value) => {
		if(value && value.length > 0){
			const candidateData = data.filter(content => content.name && content.name.toLowerCase().indexOf(value.toLowerCase()) != -1);
			this.setState({ candidateList : candidateData});
		}else{
			this.setState({ candidateList : data});
		}

	};

	setCandidate = (candidateList) =>{
		this.setState( {candidateAssignedList : candidateList });
	};


	render() {
		const { getFieldDecorator } = this.props.form;
		const   { questionCount , avgTimeTaken,totalTimeTaken,showCandidateModal,candidateList } = this.state ; 
		const rowSelection = {
				onChange: (selectedRowKeys, selectedRows) => {
					const selectedList = selectedRows.map(data=>data.name) ; 
					this.setState({selectedList : selectedList });
				}
		};
		return (
				<div>

				<Form  onSubmit={this.handleSubmit} >
				<p style={{ marginBottom : 50 , marginTop : 50,  textAlign : 'center' }} ><font size="6"><b>Test Assignment</b></font></p>
				<Modal
				title="Candidate List"
					visible={showCandidateModal}
				onOk={this.handleOk}
				onCancel={this.handleCancel} >
				<Row >
				<Col>
				<Search enterButton 
				placeholder="Search name"
					onSearch={value => this.searchCandidateList(value)}
				style={{ width: 260 }}	/>
				</Col>
				</Row>

				<Row style={{ marginTop : 16 }}>
				<Col>
				<Table rowSelection={rowSelection} columns={columns} dataSource={candidateList} />
				</Col>
				</Row>
				</Modal>


				<Form.Item label="Question Bank" {...formItemLayout}>
				{getFieldDecorator('questionBank', {
					rules: [{ required: true, message: 'Please input Question Bank!' }],
				})(
						<AutoComplete style={{ width: 200 }} />
				)}
				</Form.Item>

				<Form.Item label="Candidate" {...formItemLayout}>
				<Row gutter={8} justify="start" type="flex">                
				<Col>
				{getFieldDecorator('candidate', {
					rules: [{ required: true, message: 'Please input Candidate!' }],
				})(
						<Select mode="tags" maxTagCount={5} style={{ width: '400px' }} onChange = { e => this.setCandidate(e)}>
						</Select>
				)}
				</Col>
				<Col >
				<Button  shape="circle" icon="info" onClick={this.showModal} />
				</Col>				
				</Row>				
				</Form.Item>		
				<Form.Item label="Test Date" {...formItemLayout}>
				{getFieldDecorator('testdate', {
					rules: [{ required: true, message: 'Please input Test Date!' }],
				})(	        		  
						<RangePicker
						showTime={{ format: 'HH:mm' }}
						format="YYYY-MM-DD HH:mm"
							placeholder={['Start Time', 'End Time']}
						/>
				)}
				</Form.Item>
				<Form.Item label="Question count" {...formItemLayout}>
				{getFieldDecorator('questionCount', {
					rules: [{ required: true, message: 'Please input Question count!' }],
				})(	  
						<InputNumber min={1} max={this.state.totalQuestion} 
						onChange={e => this.setQuestionCount(e) }  />
				)}
				</Form.Item>
				<Form.Item label="Time taken for each question" {...formItemLayout}>
				<Row>				
				<Col span={3} >	
				{getFieldDecorator('avgTimeTaken', {
					rules: [{ required: true, message: 'Please input Avg Time Taken!' }],
				})(	 
						<TimePicker 
						open={this.state.open}
						onOpenChange={this.handleOpenChange}
						onChange={e => this.setAverageTimeTaken(e) }
						/>
				)}
				</Col>				
				<Col span={8}>
				{  questionCount > 0 && avgTimeTaken
					&& <Form.Item label="Total Time Taken" {...formItemLayout}>
				{getFieldDecorator('totalTimeTaken', {
					rules: [{ required: false }],
				})(	 
						<TimePicker placeholder="Total Time" value={moment(totalTimeTaken, 'HH:mm:ss')} disabled />
				)}
				</Form.Item>
				}
				</Col>					
				</Row>	

				</Form.Item>


				<Form.Item {...tailFormItemLayout}>
				{getFieldDecorator('mailsend', {
					valuePropName: 'checked',
				})(
						<Checkbox>
						Send mail to the assigned candidates.
						</Checkbox>,
				)}
				</Form.Item>

				<Form.Item  {...tailFormItemLayout}>				
				<Row gutter={8} justify="start" type="flex">                
				<Col  >
				<Button type="primary" htmlType="submit">Assign</Button>	
				</Col>
				<Col >
				<Button  onClick={this.handleReset}>Clear</Button>
				</Col>				
				</Row>				
				</Form.Item>		
				</Form>	
				</div>

		);
	}
}

function mapStateToProps(state) {
	return {
	};
}

const TestAssignmentForm = Form.create({ name: 'test_assignment_form' })(TestAssignment);

export default withRouter(connect(mapStateToProps)(TestAssignmentForm));
