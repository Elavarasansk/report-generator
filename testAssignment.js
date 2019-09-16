import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TestAssignmentForm from '../components/testAssignmentForm';
import { Statistic, Input, Row, Table, Button, Icon, Tag, Col, Select, Divider } from 'antd';
import { searchQuestionBank, searchCandidate } from '../reduxFlow/actions.js';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';
import { getAllTestAssignment } from '../reduxFlow/actions.js';
import moment from 'moment';
import { ROLE } from '../../common/constants/userRoles';

const { Option } = Select;
const Search = Input.Search;

const DATE_FORMAT = 'YYYY-MM-DD, HH:MM:SS a';


const statusFilter = [
  'New',
  'Inprogress',
  'Completed',
  'Expired',
];

const styles = {
	    select: {
	      width: 200,
	      border: '2px solid',
	      borderColor: 'royalblue',
	      borderRadius: 6,
	      marginRight: 5,
	      marginBottom: 5,
	    },
};


class TestAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      limit: 20,
      offset: 0,
      pagination: {},
      visible: false,
    };
  }
	componentDidMount = () => {
		  const param = {};
		  const { dispatch } = this.props;
		  const { limit, offset } = this.state;
		  Object.assign(param, { limit, offset });
		  this.fetch(param);
	};

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


		fetch = async (param) => {
		  const { dispatch } = this.props;
		  const { pagination } = this.state;
		  this.setState({ loading: true });
		  const data = await getAllTestAssignment(param, dispatch);
		  pagination.total = data.count;
		  pagination.current = 0;
		  this.setState(Object.assign({ loading: false, pagination }, param));
		};

		handleTableChange = async (pagination, filters, sorter) => {
		  const { dispatch } = this.props;
		  const currentPage = pagination.current;
		  const param = Object.assign(this.state, {
		    offset: currentPage - 1, limit: 10, sortKey: sorter.columnKey, sortType: sorter.order,
		  });
		  const data = await getAllTestAssignment(param, dispatch);
		  pagination.total = data.count;
		  this.setState({ pagination, sortKey: sorter.columnKey, sortType: sorter.order });
		};

		setTableData = () => {
		  const { dataList } = this.props;
		  if (!dataList || dataList.length == 0) {
		    return [];
		  }
		  const returnList = dataList.map(candidate => (Object.assign({
		    mailId: candidate.userAuthorityInfo.userCredentials.mailId,
			 questionBankName: candidate.questionBank.questionBankName,
		  }, candidate)));
		  return returnList;
		}

		closeTestAssignment = () => {
		  this.setState({ visible: false });
		}

		reloadTestAssignment = async () => {
		  this.setState({ visible: false });
		            await this.fetch(this.state);
		}


		handleFilterChange = async (type, name, value) => {
	      const dataMap = {};
	      dataMap[name] = value;
	      this.setState(dataMap);
		  const param = Object.assign(this.state, { offset: 0, limit: 20 }, dataMap);
		  await this.fetch(param);
		}

		render() {
			  const columns = [
		    {
		      title: 'Candidate',
		      dataIndex: 'mailId',
		    },
		    {
		      title: 'Question Bank',
		      dataIndex: 'questionBankName',
		    },
		    {
		      title: 'Questions Count',
		      dataIndex: 'questionsCount',
		       align: 'right',
		    }, {
		      title: 'Invite Sent',
		      dataIndex: 'inviteSent',
		       render: row => (<span> {row ? <Icon type="check" /> : <Icon type="close" /> } </span>),
		       align: 'center',
		       sorter: true,
		     },
		    {
		      title: 'Start Time',
		      dataIndex: 'testStartTime',
		      render: testStartTime => (<span>{moment(testStartTime).format(DATE_FORMAT)}</span>),
		      sorter: true,
		    },
		    {
		      title: 'End Time',
		      dataIndex: 'testEndTime',
		      render: testEndTime => (<span>{moment(testEndTime).format(DATE_FORMAT)}</span>),
		      	sorter: true,
		    },
		    {
		      title: 'Status',
		      dataIndex: 'status',
		       render: (status) => {
		      		switch (status) {
		          case 'New':
		            return (<span><Tag color="blue">{status}</Tag></span>);
		          case 'Inprogress':
		            return (<span><Tag color="red">{status}</Tag></span>);
		          case 'Submitted':
		          case 'Completed':
		            return (<span><Tag color="green">{status}</Tag></span>);
		          case 'Expired':
		            return (<span><Tag color="#bfbfbf">{status}</Tag></span>);
		          default:
		            return (<span />);
		        }
		     },
		     },
		  ];

		  const {
		    dataList, total, searchQuestionBank, searchCandidate,
		  } = this.props;

		  return (
  <div>
     { this.state.visible && <TestAssignmentForm closeTestAssignment={this.closeTestAssignment.bind(this)} reloadTestAssignment={this.reloadTestAssignment.bind(this)} onRef={ref => (this.child = ref)} /> }

    <Row type="flex" justify="start" style={{ marginTop: 24 }}>

      <Select
        allowClear
        showSearch
        style={{ ...styles.select, width: 200 }}
        optionFilterProp="children"
        onSearch={this.searchCandidate}
        placeholder="Candidate"
        optionFilterProp="children"
        onChange={value => this.handleFilterChange('select', 'mailId', value)}
        filterOption={(input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
      >
        {searchCandidate.map(candidate => <Option value={candidate}>{candidate}</Option>) }
      </Select>

      <Select
        showSearch
        allowClear
        style={{ ...styles.select, width: 200, marginLeft: 8 }}
        optionFilterProp="children"
        onSearch={this.searchQuestionBank}
        onChange={value => this.handleFilterChange('select', 'questionBankName', value)}
        placeholder="Question Bank"
        optionFilterProp="children"
        filterOption={(input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
      >
        {searchQuestionBank.map(question => <Option value={question}>{question}</Option>) }
      </Select>
      <Select
        allowClear
        style={{ ...styles.select, width: 200, marginLeft: 8 }}
        onChange={value => this.handleFilterChange('select', 'status', value)}
        placeholder="Status"
      >
        { statusFilter.map(status => <Option value={status} >{status} </Option>) }
      </Select>
      <Divider />
    </Row>
    <Row type="flex" justify="space-between" style={{ marginTop: 8 }}>
      <Col span={6}>
        <Row type="flex" justify="start">
          <Statistic
            prefix={total == 0 ? <Icon theme="twoTone" twoToneColor="red" type="dislike" /> : <Icon theme="twoTone" twoToneColor="#52c41a" type="like" />}
            value={total}
          />
        </Row>
      </Col>
      <Col span={6}>
        <Row type="flex" justify="end">
          <Button type="primary" style={{ marginRight: 8 }} onClick={() => this.setState({ visible: true })}>
            <Icon type="plus" /> Add Candidate
          </Button>
          <Button type="primary" onClick={() => this.setState({ visible: true })}>
            <Icon type="plus" /> Add Test
          </Button>
        </Row>
      </Col>
    </Row>

    <Row type="start" style={{ marginTop: 16 }}>
      <Table
        rowKey={record => record.id}
        bordered
        size="middle"
        columns={columns}
        dataSource={this.setTableData()}
        onChange={this.handleTableChange}
        loading={this.state.loading}
        pagination={this.state.pagination}
      />
    </Row>
  </div>
		  );
		}
}

TestAssignment.contextTypes = {
  role: PropTypes.string,
  loggedInUser: PropTypes.string,
};


function mapStateToProps(state) {
  return {
	    dataList: state.get('manager').toJS().getAllTestAssignment.value,
	    total: state.get('manager').toJS().getAllTestAssignment.count,
	    searchQuestionBank: state.get('manager').toJS().searchQuestionBank,
	    searchCandidate: state.get('manager').toJS().searchCandidate,

  };https://drive.google.com/file/d/1KJpTr34M1t8eJe_fD3AMrqtXlrvh77oa/view?usp=drivesdk
}https://drive.google.com/file/d/1KJpTr34M1t8eJe_fD3AMrqtXlrvh77oa/view?usp=drivesdk
export default withRouter(connect(mapStateToProps)(TestAssignment));
