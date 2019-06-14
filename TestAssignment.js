import React, { Component } from 'react';
import { AutoComplete,Row,Col,DatePicker,InputNumber,Select,Form,TimePicker,Button,Checkbox} from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import moment from 'moment';
const { RangePicker } = DatePicker;
const { Option } = Select;

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
class TestAssignment extends Component {

	constructor(props){
		super(props);
		this.state = {
				open: false,
				totalQuestion : 5 
		};
	}

	calculateTotalTime = (expirationTime, questionCount) => {
		
		if(!expirationTime){
			return "00:00:00"
		}
		let totalTime = expirationTime.clone();
		let timeSplit = expirationTime.format('HH:mm:ss').split(':');	   
		const hours = timeSplit[0];
		const minutes = timeSplit[1];
		const seconds = timeSplit[2];	   
		for (let i=0; i < questionCount; i++) {
			totalTime.add( { hours : 'hours', minutes : 'minutes' , seconds : 'seconds' } );
			console.log(totalTime)
		}
		return totalTime;

	}

	handleSearch = e => {
		e.preventDefault();
		let param = {} ; 
		this.props.form.validateFields((err, values) => {
			Object.assign(param,values);
		});		
		let dataParam = param ;
		dataParam.testStartTime =  param.testdate ? param.testdate[0] :  param.testdate;
		dataParam.testEndTime = param.testdate ? param.testdate[1] : param.testdate;
		const totalTime = this.calculateTotalTime(param.expirationTime , param.questionCount);
		
		console.log('Total time',totalTime);		

		
		console.log('Moments date', param.expirationTime);		
		Object.assign(param,dataParam);
		delete dataParam.testdate;
		console.log('Received values of form: ', dataParam);		
	};

	handleOpenChange = open => {
		this.setState({ open });
	};

	handleClose = () => this.setState({ open: false });


	render() {
		const { getFieldDecorator } = this.props.form;
		return (
				<div>
				<Row type="flex">
				<Form  onSubmit={this.handleSearch} >
				<Form.Item label="Category" {...formItemLayout} >
				{getFieldDecorator('category', {
					rules: [{ required: true, message: 'Please input Category!' }],
				})(
						<AutoComplete style={{ width: 200 }} />
				)}
				</Form.Item>
				<Form.Item label="Sub category" {...formItemLayout}>
				{getFieldDecorator('subcategory', {
					rules: [{ required: true, message: 'Please input Sub category!' }],
				})(
						<AutoComplete style={{ width: 200 }} />
				)}
				</Form.Item>
				<Form.Item label="Question Bank" {...formItemLayout}>
				{getFieldDecorator('questionBank', {
					rules: [{ required: true, message: 'Please input Question Bank!' }],
				})(
						<AutoComplete style={{ width: 200 }} />
				)}
				</Form.Item>
				<Form.Item label="Candidate" {...formItemLayout}>
				{getFieldDecorator('candidate', {
					rules: [{ required: true, message: 'Please input Candidate!' }],
				})(
						<Select mode="tags" style={{ width: '400px' }} >
						</Select>
				)}
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
						<InputNumber min={1} max={this.state.totalQuestion}  />
				)}
				</Form.Item>

				<Form.Item label="Avg Time Taken" {...formItemLayout}>
				{getFieldDecorator('expirationTime', {
					rules: [{ required: true, message: 'Please input Avg Time Taken!' }],
				})(	  
						<TimePicker 
						open={this.state.open}
						onOpenChange={this.handleOpenChange}
						defaultOpenValue={ moment('00:01:00', 'HH:mm:ss') }
						addon={() => (
								<Button size="small" type="primary" onClick={this.handleClose} >
								Ok
								</Button>
						)}
						/>
				)}
				</Form.Item>

				<Form.Item {...tailFormItemLayout}>
				{getFieldDecorator('mailsend', {
					valuePropName: 'checked',
				})(
						<Checkbox>
						send mail to the assigned candidates.
						</Checkbox>,
				)}
				</Form.Item>
				<Form.Item  {...tailFormItemLayout}>
				<Button type="primary" htmlType="submit">Assign</Button>
				</Form.Item>
				</Form>		
				</Row>
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
