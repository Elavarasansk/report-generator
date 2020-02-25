



Hi Trio team ,

We were working on the IOS Deeplink for the past 3 days and finally we came to the solution.

While Validating the AASA(Apple App Site Association) Validator it throws an error "Domain is not valid".
Kindly refer the validator link below and refer the attachment for more detailed explanation.

https://branch.io/resources/aasa-validator/

We have completed & deployed  AASA configuration in Web-server.
Once a valid domain is hosted, we will be able to work with the IOS deeplink and fix the issues if there are any.

Kindly do the needful.

Thanks & Regards ,
Elavarasan S.
ForU Technologies & Services.


import React, { Component } from 'react';
import { Input ,Row,Table,Button,Modal} from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Chart, Axis, Legend, Tooltip, Geom } from 'bizcharts';

const Search = Input.Search;



const dataSource =  [ {candidateName : 'Ela',questionBank : 'Core java',testCategory:'computerScience',testDate : '2019-06-05', questionTaken : '10',
	answeredCorrect : '3',answeredWrong:'3',unanswered:'4',totalMarkObtained:'36%',timeTaken:'20 Min'} ];

class TestResult extends Component {

	constructor(props){
		super(props);
		this.state = { showAnalysisModal : false } ;
	}

	showChart = (row) => {
		console.log(row);
		this.setState({showAnalysisModal : true });
	};

	printResult = (row) => {
		console.log(row);
	};

	handleSearch = text => {

	};

	render() {

		const columns = [
			{
				title: 'Candidate name',
				dataIndex: 'candidateName'
			},
			{
				title: 'Question Bank',
				dataIndex: 'questionBank'
			},
			{
				title: 'Test Category',
				dataIndex: 'testCategory',
			},
			{
				title: 'Test Date',
				dataIndex: 'testDate',
			},
			{
				title: 'Questions Taken',
				dataIndex: 'questionTaken',
				align : 'right'
			},
			{
				title: 'Answered Correct',
				dataIndex: 'answeredCorrect',
				align:'right'
			},
			{
				title: 'Answered Wrong',
				dataIndex: 'answeredWrong',
				align:'right'
			},
			{
				title: 'Unanswered',
				dataIndex: 'unanswered',
				align:'right'
			},
			{
				title: 'Total Mark Obtained',
				dataIndex: 'totalMarkObtained',
			},
			{
				title: 'Time Taken',
				dataIndex: 'timeTaken',
			},
			{
				title: 'Analysis',
				key: 'analysis',
				render: (row) => { return <span><Button shape="circle"  icon={"pie-chart"} type="primary" onClick={() => this.showChart(row)} /></span> }
			},
			{
				title: 'Print',
				key: 'print',
				render: (row) => { return <span><Button shape="circle" icon={'printer'}  type="primary" onClick={() => this.printResult(row)}  /></span> }
			}

			];

		const data = [
			{ month: 'Jan.', count: 69, city: 'tokyo' }
			];

		const scale = {
				month: {alias: 'Month',},
				count: {alias: 'Sales',},
		};

		const  { showAnalysisModal } = this.state ; 

		return (
				<div>
				<p style={{ marginBottom : 50 , marginTop : 50,  textAlign : 'center' }} ><font size="6"><b>Test Result</b></font></p>

				<Modal
				title="Analysis Report"
					visible={showAnalysisModal}
				onOk={()=>this.setState( { showAnalysisModal : false } )}
				onCancel={()=>this.setState( { showAnalysisModal : false } )}

				>
				<Chart height={400} data={data} scale={scale} forceFit>
				<Axis title name="month" />
					<Axis title name="count" />
				<Legend />
				<Tooltip crosshairs={{ type: 'rect' }} />
				<Geom type="interval" position="month*count" color="month" />
					</Chart>
				</Modal>

				<Row type="flex" justify="center">
				<Search       
				size="large"
					style={{ width: '50%' }}
				placeholder="Ex). Candidate name,Question bank,Test category" 
					onSearch={ value => this.handleSearch(value) } enterButton />
				</Row>
				<Row type="flex" justify="start" style={{ marginTop : 16 }}>
				<Table columns={columns} dataSource={dataSource} />
				</Row>
				</div>

		);
	}
}

function mapStateToProps(state) {
	return {
	};
}


export default withRouter(connect(mapStateToProps)(TestResult));
