

// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/

// Load the AWS SDK
var AWS = require('aws-sdk'),
    region = "ap-south-1",
    secretName = "test/postgres",
    secret,
    decodedBinarySecret;

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    region: region
});

// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.

client.getSecretValue({SecretId: secretName}, function(err, data) {
    if (err) {
        if (err.code === 'DecryptionFailureException')
            // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InternalServiceErrorException')
            // An error occurred on the server side.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InvalidParameterException')
            // You provided an invalid value for a parameter.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InvalidRequestException')
            // You provided a parameter value that is not valid for the current state of the resource.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'ResourceNotFoundException')
            // We can't find the resource that you asked for.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
    }
    else {
        // Decrypts secret using the associated KMS CMK.
        // Depending on whether the secret is a string or binary, one of these fields will be populated.
        if ('SecretString' in data) {
            secret = data.SecretString;
        } else {
            let buff = new Buffer(data.SecretBinary, 'base64');
            decodedBinarySecret = buff.toString('ascii');
        }
    }
   
    // Your code goes here.
});

Secret name: test/postgres
Region: ap-south-1
RDS endpoint: chillupp-db.czeip4scqlfl.ap-south-1.rds.amazonaws.com





import React, { Component } from 'react';




import {
  AutoComplete, Row, Col, DatePicker, InputNumber, Select, Form, TimePicker,
  Button, Checkbox, Modal, Table, Input, message as AntMessage, Drawer,Steps
} from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { registerTest, searchQuestionBank, searchCandidate, getAllCandidate, getQuestionBankCount } from '../reduxFlow/actions.js';
import { ROLE } from '../../common/constants/userRoles';
import moment from 'moment';

const { RangePicker } = DatePicker;
const confirm = Modal.confirm;
const Search = Input.Search;
const { Option } = AutoComplete;

const { Step } = Steps;


const steps = [
  {
    title: 'Input'
  },
  {
    title: 'Verify'
  },
  {
    title: 'Done'
  }
];


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
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
  },
];

class TestAssignmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      totalQuestion: 5,
      totalTimeTaken: '00:00:00',
      questionCount: 0,
      showCandidateModal: false,
      selectedList: [],
      loading: false,
      offset: 0,
      limit: 20,
      pagination: {},
      current : 0

    };
  }

	  componentDidMount() {
		    this.props.onRef(this);
		  }

		  componentWillUnmount() {
		    this.props.onRef(undefined);
		  }

	showModal = async () => {
	  const param = {};
	  const { offset, limit, pagination } = this.state;
	  const { dispatch } = this.props;
	  Object.assign(param, {
	    offset: 0, limit: 20, role: ROLE.CANDIDATE, mailId: '',
	  });
	  const data = await getAllCandidate(param, dispatch);
	  pagination.total = data.count;
	  pagination.current = 1;
	  this.setState({
	    showCandidateModal: true, pagination, mailId: '',
	  });
	};

	searchCandidateList = async (value) => {
	  const param = {};
	  const { dispatch } = this.props;
	  const { pagination } = this.state;

	  Object.assign(param, {
	    offset: 0, limit: 20, role: ROLE.CANDIDATE, mailId: value,
	  });
	  const data = await getAllCandidate(param, dispatch);
	  pagination.total = data.count;
	  this.setState({ pagination, mailId: value });
	};


	showConfirm = async () => {
	  confirm({
	    width: 480,
	    title: 'Are you sure do you want to assign the test?',
	    centered: true,
	    onOk: async () => { await this.onConfirmClick(); },
	  });
	}

	calculateTotalTime = (expirationTime, questionCount) => {
	  if (!expirationTime || questionCount <= 0) {
	    return '00:00:00';
	  }
	  const totalTime = expirationTime.clone();
	  const timeSplit = expirationTime.format('HH:mm:ss').split(':');
	  const hours = parseInt(timeSplit[0]) * questionCount;
	  const minutes = parseInt(timeSplit[1]) * questionCount;
	  const seconds = parseInt(timeSplit[2]) * questionCount;
	  totalTime.set('hours', hours);
	  totalTime.set('minutes', minutes);
	  totalTime.set('seconds', seconds);
	  this.setState({ expirationTime: totalTime });
	  return totalTime;
	}

	handleSubmit = async (e) => {
	  e.preventDefault();
	  let isValid = false;
	  const { form } = this.props;
	  form.validateFields(err => isValid = !err);
	  if (!isValid) {
	    return;
	  }
	  this.next();
	};

	onConfirmClick = async () => {
	  await this.registerTest().catch(this.handleError);
	};

	registerTest = async () => {
	  this.setState({ loading: true });
	  const { form, dispatch } = this.props;
	  const param = form.getFieldsValue();
	  param.testStartTime = param.testdate ? param.testdate[0] : param.testdate;
	  param.testEndTime = param.testdate ? param.testdate[1] : param.testdate;
	  delete param.testdate;
	  await registerTest(param, dispatch);
	  this.setState({ loading: false });
	  AntMessage.success('Test Assigned successfully.');
	    this.props.reloadTestAssignment();
	};


	handleError = (err) => {
	  AntMessage.error(`${err.customError}`);
	  this.setState({ loading: false });
	}


	handleOpenChange = (open) => {
	  this.setState({ open });
	};

	handleClose = () => this.setState({ open: false });

	handleReset = () => {
	  this.props.form.resetFields();
	  this.setState({ questionBankName: null });
	};

	setAverageTimeTaken = (e) => {
	  const { questionCount } = this.state;
	  const totalTimeTaken =	this.calculateTotalTime(e, questionCount);

	  this.props.form.setFields({
	    expirationTime: {
	      value: totalTimeTaken,
	    },
	  });
	  this.setState({ avgTimeTaken: e });
	};

	setQuestionCount = (e) => {
	  const { avgTimeTaken } = this.state;
	  const totalTimeTaken = this.calculateTotalTime(avgTimeTaken, e);
	  this.props.form.setFields({
	    expirationTime: {
	      value: totalTimeTaken,
	    },
	  });
	  this.setState({ questionCount: e });
	};


	setCandidate = (candidateList) => {
	  const { selectedList } = this.state;
	  const { searchCandidate } = this.props;
	  if (searchCandidate.includes(candidateList)) {
	    this.setState({ selectedList: selectedList.concat(candidateList) });
	  }
	};


	handleOk = (e) => {
	  const { selectedList } = this.state;
	  this.props.form.setFields({
	    assigneeList: {
	      value: Array.from(new Set(selectedList)),
	    },
	  });

	  this.setState({
	    showCandidateModal: false,
	  });
	};

	handleCancel = (e) => {
	  this.setState({
	    showCandidateModal: false,
	    limit: 20,
	    offset: 0,
	  });
	};


	getQuestionBankCount = async (questionBankName) => {
	  const { dispatch } = this.props;
	  await getQuestionBankCount(questionBankName, dispatch);
	}

	searchQuestionBank = async (e) => {
	  const { dispatch } = this.props;
	  const { loggedInUser } = this.context;
	  const param = {};
	  param.questionBankName = e;
	  param.suggestLimit = 5;
	  param.mailId = loggedInUser;
	  await searchQuestionBank(param, dispatch);
	};

	searchCandidate = async (e) => {
	  const { dispatch } = this.props;
	  const param = {};
	  param.mailId = e;
	  param.suggestLimit = 5;
	  param.role = ROLE.CANDIDATE;
	  await searchCandidate(param, dispatch);
	}

	setTableData = () => {
	  const { getAllCandidate } = this.props;
	  if (!getAllCandidate.value || getAllCandidate.value.length == 0) {
	    return [];
	  }
	  let returnList = [];
	  returnList = getAllCandidate.value.map(candidate => ({ name: candidate, key: candidate }));
	  return returnList;
	}


	handleTableChange = async (pagination, filters, sorter) => {
	  const { dispatch } = this.props;
	  const value = this.state.mailId;
	  const currentPage = pagination.current;
	  const param = { offset: currentPage - 1, limit: 10 };
	  Object.assign(param, { role: ROLE.CANDIDATE, mailId: value || '' });
	  const data = await getAllCandidate(param, dispatch);
	  pagination.total = data.count;
	  this.setState({ pagination });
	};


	validateQuestionBank = (value) => {
	  const { searchQuestionBank } = this.props;
	  if (!searchQuestionBank.includes(value)) {
	    this.setState({ questionBankName: null });
	  } else {
	    this.setState({ questionBankName: value });
	    this.getQuestionBankCount(value);
	  }
	};

	onClose = () => {
	    this.handleReset();
	    this.props.closeTestAssignment();
	};
	
	
	 next = () => {
		    const current = this.state.current + 1;
		    this.setState({ current : current });
		  }

		  prev = () => {
		    const current = this.state.current - 1;
		    this.setState({ current : current });
		  }

	render() {
	  const { getFieldDecorator } = this.props.form;
	  const {
	    questionCount, avgTimeTaken, totalTimeTaken, showCandidateModal, candidateList, questionBankName, selectedList, searchText,
	    current } = this.state;
	  const { searchQuestionBank, searchCandidate, totalQuestionCount } = this.props;
	  const rowSelection = {
	    onChange: (selectedRowKeys, selectedRows) => {
	      this.setState({ selectedList: selectedRowKeys });
	    },
	    selectedRowKeys: selectedList,
	  };
	  return (
  <div>

    <Drawer
      title="Test Assignment"
      width={720}
      onClose={this.onClose}
      visible
      maskClosable={false}
    >
    <Steps current={current} style={{marginBottom : 24}}>
    {steps.map(item => (
      <Step key={item.title} title={item.title} />
    ))}
  </Steps>
  { current == 0 && 
      <Form onSubmit={this.handleSubmit} >
        { showCandidateModal && <Modal
          title="Candidate List"
          visible={showCandidateModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row >
            <Col>
              <Search
                enterButton
                placeholder="Search name"
                defaultValue=""
                onSearch={value => this.searchCandidateList(value)}
                style={{ width: 260 }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 16 }}>
            <Col>
              <Table
                bordered
                rowSelection={rowSelection}
                onChange={this.handleTableChange}
                columns={columns}
                dataSource={this.setTableData()}
                pagination={this.state.pagination}
                size="middle"
              />
            </Col>
          </Row>
        </Modal>
				}
        <Form.Item label="Question Bank" {...formItemLayout}>
          {getFieldDecorator('questionBankName', {
					rules: [{ required: true, message: 'Please input Question Bank!' }],
				})(<AutoComplete
  style={{ width: 200 }}
  onSelect={(value, option) => this.setState({ questionBankName: value }) && this.getQuestionBankCount(value)}
  onSearch={this.searchQuestionBank}
  onChange={this.validateQuestionBank}
				>
  {searchQuestionBank.map(question => <Option key={question}>{question}</Option>) }
</AutoComplete>)}
        </Form.Item>
        <Form.Item label="Candidate" {...formItemLayout}>
          <Row gutter={8} justify="start" type="flex">
            <Col>
              {getFieldDecorator('assigneeList', {
					rules: [{ required: true, message: 'Please input Candidate!' }],
				})(<Select
  disabled={!questionBankName}

  mode="multiple"
  maxTagCount={5}
  style={{ width: '400px' }}
  onSelect={this.setCandidate}
  onSearch={this.searchCandidate}
				>
  {searchCandidate.map(candidate => <Option key={candidate}>{candidate}</Option>) }
</Select>)}
            </Col>
            <Col >
              <Button disabled={!questionBankName} shape="circle" icon="search" onClick={this.showModal} />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="Test Date" {...formItemLayout}>
          {getFieldDecorator('testdate', {
					rules: [{ required: true, message: 'Please input Test Date!' }],
				})(<RangePicker
  disabled={!questionBankName}
  showTime={{ format: 'HH:mm' }}
  format="YYYY-MM-DD HH:mm"
  placeholder={['Start Time', 'End Time']}
				/>)}
        </Form.Item>
        <Form.Item label="Question count" {...formItemLayout}>
          {getFieldDecorator('questionsCount', {
					rules: [{ required: true, message: 'Please input Question count!' }],
				})(<InputNumber
  min={1}
  max={totalQuestionCount}
  disabled={!questionBankName}
  onChange={e => this.setQuestionCount(e)}
				/>)}
        </Form.Item>
        <Form.Item label="Time taken for each question" {...formItemLayout}>
          {getFieldDecorator('avgTimeTaken', {
					rules: [{ required: true, message: 'Please input Time taken for each question!' }],
				})(<TimePicker
  disabled={!questionBankName}
  open={this.state.open}
  onOpenChange={this.handleOpenChange}
  onChange={e => this.setAverageTimeTaken(e)}
				/>)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('inviteSent', {
					valuePropName: 'checked',
				})(<Checkbox disabled={!questionBankName}>
				Send mail to the assigned candidates.
</Checkbox>)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button style={{ marginRight: 8 }}onClick={this.handleReset}>Clear</Button>
          <Button  type="primary" htmlType="submit">Next</Button>
        </Form.Item>
        }
          </Form>
          }

       { current == 1 && 
        <div>   
       <Button onClick={() => this.prev()} style={{ marginRight: 8 }}>Previous</Button>
        <Button  type="primary"  onClick={() => this.next()}>Next</Button>
      </div>
       }
        
    </Drawer>
  </div>
	  );
	}
}


TestAssignmentForm.contextTypes = {
  role: PropTypes.string,
  loggedInUser: PropTypes.string,
};


function mapStateToProps(state) {
  return {
    searchQuestionBank: state.get('manager').toJS().searchQuestionBank,
    searchCandidate: state.get('manager').toJS().searchCandidate,
    getAllCandidate: state.get('manager').toJS().getAllCandidate,
    totalQuestionCount: state.get('manager').toJS().getQuestionBankCount,
  };
}

const TestAssignmentContainer = Form.create({ name: 'test_assignment_form' })(TestAssignmentForm);

export default withRouter(connect(mapStateToProps)(TestAssignmentContainer));
