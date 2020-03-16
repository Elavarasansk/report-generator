

select U.profile_name,U.profile_image,C.content_title,C.positive,
C.negative, C.warning, C.share, C.score, C.uploaded_time,
R.district_rank, R.state_rank,
u.contact_card,
R.content_id as content_id,
C.is_active,
c.district_id, D.name as district,
c.state_id, S.name as state, L.name as language,
c.content_type_id, C_t.name as content_type ,

C.schedule_id, Sh.end_date,
C.membership_id, m.name as membership,
U.id as user_id
from rank as R
Inner Join contents as C on R.content_id = C.id
Inner Join users as U on C.user_id = U.id
Inner Join content_types as C_t on C.content_type_id = C_t.id
Inner Join membership as m on C.membership_id = m.id
Inner Join districts as D on C.district_id = D.id
Inner Join states as S on C.state_id = S.id
Inner Join schedules as Sh on C.schedule_id = Sh.id
Inner Join languages as L on C.language_id = L.id
order by state_rank

HOF  Query
select U.profile_name,U.profile_image,C.content_title,C.positive,
C.negative, C.warning, C.share, C.score, C.uploaded_time,
H.district_rank, H.state_rank,
u.contact_card,
H.content_id as content_id,
C.is_active,
c.district_id, D.name as district,
c.state_id, S.name as state, L.name as language,
c.content_type_id, C_t.name as content_type ,
c.content_type_id,C_t.name as content_type,

C.schedule_id, Sh.end_date,
C.membership_id, m.name as membership,
U.id as user_id,
H.created_at
from hof as H
Inner Join contents as C on H.content_id = C.id
Inner Join users as U on C.user_id = U.id
Inner Join content_types as C_t on C.content_type_id = C_t.id
Inner Join membership as m on C.membership_id = m.id
Inner Join districts as D on C.district_id = D.id
Inner Join states as S on C.state_id = S.id
Inner Join schedules as Sh on C.schedule_id = Sh.id
Inner Join languages as L on C.language_id = L.id
order by state_rank




{
  "responseBody": {
    "status": 200,
    "message": "SUCCESS",
    "count": "2",
    "result": [
      {
        "id": "08103df4-5539-44bf-b442-0d4a27a7e627",
        "file_name": "movie.mp4",
        "file_size": "318465",
        "content_title": "movie",
        "is_active": true,
        "is_artistic": false,
        "uploaded_time": "2020-01-02T06:28:52.585Z",
        "status": null,
        "user_id": "54ea92c5-2d5e-4989-9157-c087a8d86304",
        "schedule_id": "33f25853-4e5c-401b-a638-a7923e057667",
        "language_id": null,
        "state_id": null,
        "content_type_id": "56f88972-4111-4735-87a7-ef08a7aaa04f",
        "district_id": null,
        "membership_id": "c4cabda0-89f7-42fc-a72f-04985a60e44d",
        "talent_id": null,
        "membership": {
          "id": "c4cabda0-89f7-42fc-a72f-04985a60e44d",
          "name": "UP"
        },
        "contentType": {
          "id": "56f88972-4111-4735-87a7-ef08a7aaa04f",
          "name": "VIDEO"
        },
        "schedule": {
          "id": "33f25853-4e5c-401b-a638-a7923e057667",
          "end_date": "2020-01-26T11:30:00.000Z"
        },
        "votes": {
          "positive": 0,
          "negative": 0,
          "warning": 0,
          "share": 0,
          "score": 0,
          "user_id": "54ea92c5-2d5e-4989-9157-c087a8d86304"
        },
        "users": {
          "id": "54ea92c5-2d5e-4989-9157-c087a8d86304",
          "profile_name": null,
          "profile_image": null,
          "contact_card": null
        }
      },
      {
        "id": "103c96ec-9d1b-434d-846a-a1e32fb8012f",
        "file_name": "movie1.mp4",
        "file_size": "318465",
        "content_title": "movie1",
        "is_active": true,
        "is_artistic": false,
        "uploaded_time": "2020-01-02T06:29:02.036Z",
        "status": null,
        "user_id": "54ea92c5-2d5e-4989-9157-c087a8d86304",
        "schedule_id": "33f25853-4e5c-401b-a638-a7923e057667",
        "language_id": null,
        "state_id": null,
        "content_type_id": "56f88972-4111-4735-87a7-ef08a7aaa04f",
        "district_id": null,
        "membership_id": "c4cabda0-89f7-42fc-a72f-04985a60e44d",
        "talent_id": null,
        "membership": {
          "id": "c4cabda0-89f7-42fc-a72f-04985a60e44d",
          "name": "UP"
        },
        "contentType": {
          "id": "56f88972-4111-4735-87a7-ef08a7aaa04f",
          "name": "VIDEO"
        },
        "schedule": {
          "id": "33f25853-4e5c-401b-a638-a7923e057667",
          "end_date": "2020-01-26T11:30:00.000Z"
        },
        "votes": {
          "id": "afbd23f4-f1a7-4714-ad8b-d477c218f6b3",
          "positive": 1,
          "negative": 2,
          "warning": 3,
          "share": 1,
          "user_id": "54ea92c5-2d5e-4989-9157-c087a8d86304",
          "content_id": "103c96ec-9d1b-434d-846a-a1e32fb8012f",
          "removal_condition_id": null
        },
        "users": {
          "id": "54ea92c5-2d5e-4989-9157-c087a8d86304",
          "profile_name": null,
          "profile_image": null,
          "contact_card": null
        }
       }
	   ]
	  }
}

The following are the details to access AWS console.
User name: Vairavan
Password: 9yspZI(x3Jhi
Console login link: https://882528344673.signin.aws.amazon.com/console
I have given access to EC2 instance. Please let me know if you require any further access.

Regards,
Sukanya

import psycopg2
import boto3
import json
session = boto3.session.Session()
client = session.client(
    service_name='secretsmanager',
    region_name='ap-south-1'
)
secret = client.get_secret_value(
         SecretId='test/postgres'
)
secret_dict = json.loads(secret['SecretString'])

username = secret_dict['username']
passw = secret_dict['password']

conn = psycopg2.connect(host="chillupp-db.czeip4scqlfl.ap-south-1.rds.amazonaws.com",port='5432',database="chillupp", user=username, password=passw)
def handler(event, context):
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM users")
            print(cursor.fetchall())
    except psycopg2.Error as e:
        print(e)    

In aws cli, I used the following command to get secret
aws secretsmanager get-secret-value --secret-id test/postgres
And this is the output.
{
    "ARN": "arn:aws:secretsmanager:ap-south-1:882528344673:secret:test/postgres-p1jgM2",
    "Name": "test/postgres",
    "VersionId": "2f8d8ed6-ec11-4f6d-a954-65fa7c97fdcc",
    "SecretString": "{\"username\":\"qazxdr\",\"password\":\"1a8nJ7v8zQnumGF4BN22\",\"engine\":\"postgres\",\"host\":\"chillupp-db.czeip4scqlfl.ap-south-1.rds.amazonaws.com\",\"port\":5432,\"dbname\":\"chillupp\",\"dbInstanceIdentifier\":\"chillupp-db\"}",
    "VersionStages": [
        "AWSCURRENT"
    ],
    "CreatedDate": 1578305381.147
}

/api/Contents?filter={ "where" : { "user_id" : "a74c33bc-d6b2-461a-934c-c0109e0bb072" } , "include" :  [    { "relation" : "contentType" } ,  { "relation" : "membership" }  , { "relation" : "votes" ,  "scope" : { "where" :  { "user_id" : "a74c33bc-d6b2-461a-934c-c0109e0bb072"} } } ] }&access_token=0f4068ZmD4P8LcLa1Bxm6CSF36SiU6MXV8YBiDLFxT5xujKFf1EgbZdwhQCEwc1I

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
