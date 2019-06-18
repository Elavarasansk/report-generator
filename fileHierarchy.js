/**
 * http://usejsdoc.org/
 */

import React,{Component} from 'react';


import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getFormFileData,getFormFileSearchData } from '../reduxFlow/iwActions';
import {  Row, Col ,Table,Icon,Popover,Tree,Input,Tabs,Card,Spin,Tag,Button,InputNumber,Tooltip,Pagination } from 'antd';
import * as ActionTypes from '../reduxFlow/actionTypes';
import '../../../styles/form.css';
import '../../../styles/formhierarhy.css';


const TabPane = Tabs.TabPane;
const { TreeNode } = Tree ;
const Search = Input.Search ; 

class fileHierarchy extends Component {

	constructor(props){
		super(props);
		this.state = {
				treeData : []	,
				loading : false ,
				filteredData : [],
				formName : '',
				isMyParent : false,
				isMyChild : false,
				selectedIndex : 0,
				hierarchyLoading : false,
				offSet : 0,
				limit : 50,
				isSearch : false,
				searchValue : '',
				childOffSet : 0,
				childLimit : 10,
				parentOffSet : 0,
				parentLimit : 10 
		};
	}

	componentDidMount = async() =>{
		const { dispatch } = this.props;	
		this.setState({loading : true }); 
		const { offSet,limit }  = this.state;
		const param = { 'offSet': offSet , 'limit': limit };
		await getFormFileData(dispatch,param);
		this.setState({loading : false }); 
	};


	constructParentNode = (data,formName) => {
		const { isParent, isChild, fileName, absoluteFilePath, childEntry } = data;
		return (  
				<TreeNode  icon={formName === fileName ?  <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/> : '' }
				title={fileName} key={absoluteFilePath}>
				{childEntry && Array.isArray(childEntry) && 
					this.constructChildNodes(childEntry,formName)}
				</TreeNode>
		);
	};

	constructChildNodes = (childList,formName) => {
		return (childList.map((data) => this.constructParentNode(data,formName)));
	}


	showSpinner=async()=>{
		await	this.setState({hierarchyLoading : true});
	}

	hideSpinner=async()=>{
		await this.setState({hierarchyLoading : false});
	}


	showParent= async(record) =>{
		await this.showSpinner();
		const data = Object.assign({},record);
		delete data.childrenList ;
		const lastIndex = data.formName.lastIndexOf('/') + 1 ;
		const txt = data.formName.substring(lastIndex);
		this.hideSpinner();
		await this.setState({treeData :data , formName : txt, isMyParent : true , isMyChild : false,parentOffSet : 0,parentLimit : 10 });

	};

	showChild= async(record) =>{	
		await this.showSpinner();
		const data = Object.assign({},record);
		delete data.parentList;
		const lastIndex = data.formName.lastIndexOf('/') + 1 ;
		const txt = data.formName.substring(lastIndex);
		this.hideSpinner();
		await this.setState({treeData :data , formName : txt,isMyParent : false , isMyChild : true,childOffSet : 0,childLimit : 10});
	};

	/*	handleSearchFilter = async(text) => {
		const { dispatch,getFormFileData } = this.props;		  
		const searchValue = text.formName ;
		let filteredData = getFormFileData ? getFormFileData.toJS().length > 0 ? getFormFileData.toJS() : [] : [];
		if(searchValue && searchValue.length > 0){
			filteredData = filteredData.filter(content => 
			content.formName 
			&&  
			content.formName.toLowerCase().indexOf(searchValue.toLowerCase()) != -1);
		}
		this.setState({loading : false,filteredData : filteredData  });

	}*/

	handleSearchFilter = async(text) => {		
		this.setState({treeData : []});
		const searchValue = text.formName ;
		const { dispatch } = this.props;	
		this.setState({loading : true, searchValue : searchValue});
		if(searchValue && searchValue.length > 0) {
			const param = text;
			Object.assign( param , {offSet : 0,limit : 50 });
			let searchData = await getFormFileSearchData(dispatch,param);
			let filteredData = searchData ? searchData.length > 0 ? searchData : [] : [];
			await this.setState({loading : false,'filteredData': filteredData,isSearch : true ,offSet : 0,limit : 50 });
		}else{
			const param = { 'offSet': 0 , 'limit': 50 };
			dispatch({   type:ActionTypes.RECEIVE_FORM_FILE_DATA,    data:[]  });
			let filterData = await getFormFileData(dispatch,param);
			await this.setState({loading : false,filteredData : filterData ,isSearch : false,offSet : 0,limit : 50 });
		}

	};


	handleDprSearchFilter = async(text,treeData) => {
		const { isMyParent,isSearch } = this.state;
		const { getFormFileData,searchData } = this.props;	
		let returnList;
		let filterData = [];
		if(isSearch){
			filterData = searchData ? searchData.toJS().length > 0 ? searchData.toJS() : [] : [];
		}else{
			filterData = getFormFileData ? getFormFileData.toJS().length > 0 ? getFormFileData.toJS() : [] : [];
		}
		const formName = treeData.formName;
		const filterRecord = filterData.filter(content => content.formName && content.formName.toLowerCase().indexOf(formName.toLowerCase()) != -1);
		let hierachyList =  isMyParent ? filterRecord[0].parentList : filterRecord[0].childrenList ;

		if(text && text.length > 0){
			returnList = hierachyList.filter(content => content.dprName && (content.dprName+".dpr").toLowerCase().indexOf(text.toLowerCase())  != -1 );
		}else{
			returnList = hierachyList;
		}
		if(isMyParent){
			treeData.parentList = returnList ;
			this.showParent(treeData);
		}else{
			treeData.childrenList = returnList;
			this.showChild(treeData);
		}
	}


	onSelect = (keys, event) => {
		console.log('Trigger Select', keys, event);
	};

	loadPage = async(pagination) => {
		const { offSet,limit,isSearch,searchValue }  = this.state;
		const { dispatch } = this.props;
		const current  = pagination.current; 
		console.log(offSet ,limit,current);
		this.setState({treeData : []});
		if(!isSearch && limit === current*10){
			await this.setState({ loading : true });
			const param = { 'offSet': limit , 'limit': limit+50};
			await getFormFileData(dispatch,param);
			await this.setState({ 'offSet': limit , 'limit': limit+50 ,loading : false,filteredData : [] });
		}else if(isSearch && limit === current*10){
			await this.setState({ loading : true });
			let paramData = { 'offSet': limit , 'limit': limit+50};
			paramData.formName =  searchValue;
			const filteredData = await getFormFileSearchData(dispatch,paramData);
			await this.setState({ 'offSet': limit , 'limit': limit+50 ,loading : false, filteredData : filteredData});
		}
	};


	render(){


		const iwStatsColumn = [{
			title: 'Form Name',
			dataIndex: 'formName',
			key: 'formName',
			width:150
		},{
			title: 'Parent',
			dataIndex: 'Parent',
			key: 'Parent',
			width:60,
			render: (text,row ) => { return(Array.isArray(row.parentList) && row.parentList.length > 0 ? <span style={{width:250}}>
			<Button icon={'cluster'}  type="primary" ghost onClick={async() => { await this.showParent(row);}}  /> </span> : <span style={{width:250}}><Button type="danger" icon={'close'} /> </span> )   }
			},{
				title: 'Children',
				dataIndex: 'child',
				key: 'child',
				width:60,
				render: (text,row ) => { 
					return(  Array.isArray(row.childrenList) && row.childrenList.length > 0 ?
							<span style={{width:250}}><Button icon={'cluster'}  type="primary" ghost onClick={async() => { await this.showChild(row); }} /> </span> 
							: <span style={{width:250}}><Button icon={'close'} type="danger" /> </span>) }  }];



		let { getFormFileData,count }  = 	this.props
		const {treeData,filteredData,loading,formName,selectedIndex,hierarchyLoading,isMyParent , childOffSet,childLimit,parentOffSet,parentLimit } = this.state ;
		getFormFileData = getFormFileData ? getFormFileData.toJS().length > 0 ? getFormFileData.toJS() : [] : [];
		const gridData = filteredData.length > 0 ? filteredData : getFormFileData;
		return (
				<div>
				<Spin spinning={loading} >
				<Row type="flex" gutter={16}>
				<Col>
				<Search
				placeholder="Filter by forms"
					onSearch={value => this.handleSearchFilter({'formName': value})}
				style={{ width: 300, marginBottom: 10 }} />
				</Col>
				<Col>
				<InputNumber  style={{color: 'white', backgroundColor: 'grey'}}
				defaultValue={0}
				formatter={value => `${count}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
				disabled={true}
				/> Forms				</Col>
				</Row>

				<Row type="flex" justify="space-between" >
				<Col span={2}>
				<Table 
				onChange={(pagination)=> this.loadPage(pagination) }
				rowClassName={(record, index) => index === selectedIndex ? 'select-row-cal' : '' }
				onRowClick={(record,rowIndex)=> this.setState({selectedIndex : rowIndex } )}
				columns={iwStatsColumn} 
				dataSource={gridData}
				rowKey={row => row._id}
				size = "middle"
					pagination={{
						defaultPageSize: 10,
						pageSize:10,
						size:'small'
					}}
				bordered
				style={{ border:'0px solid #ccc', backgroundColor:'white', marginTop:7, minWidth:700 }}				
				/> </Col>

				{ treeData &&	<Col span={12}>  { treeData.formName &&
					<div>
				<Row type="flex" justify="start" gutter={16}>
				<Col>
				<Search	placeholder="Filter by DPR"	onSearch={value => this.handleDprSearchFilter(value,treeData)}
				style={{ width: 300, marginBottom: 10 }} /> 				
				</Col>
				<Col>
				<InputNumber  style={{color: 'white', backgroundColor: 'grey'}}
				defaultValue={0}
				formatter={value => `${ isMyParent ? treeData.parentList.length : treeData.childrenList.length }`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
				disabled={true}
				/> DPR 					
				</Col></Row>
				</div> } <Spin spinning={hierarchyLoading} >
				<Tabs> 
				{  treeData && treeData.parentList && treeData.parentList.length > 0 &&
					<TabPane tab="My Parent" key="1" > 
                <div id="child-hierarchy" style={{	overflow: 'auto',height: '620px',width:'auto' }}>
				<Row type="flex"  >
				{ treeData.parentList.slice(parentOffSet,parentLimit).map((data,index) =>
				<Card title={data.dprName+".dpr"} bordered={true} >
				<Tree
				onSelect={this.onSelect}
				showLine
				showIcon
				defaultExpandAll={true} >
				{this.constructParentNode(data,formName)}
				</Tree>
				</Card> 
				)}	
				</Row> 	
				</div>
				</TabPane> 
				}
				{ treeData && treeData.childrenList && treeData.childrenList.length > 0 && 
					<TabPane tab="My Childern" key="2" >
                <div id="parent-hierarchy" style={{	overflow: 'auto',height: '620px',width:'auto' }}>
				<Row type="flex"   >
				{ treeData && treeData.childrenList && treeData.childrenList.length > 0  && treeData.childrenList.slice(childOffSet,childLimit).map((data,index) =>
				<Card title={data.dprName+".dpr"} bordered={true} >
				<Tree
				showIcon
				showLine
				onSelect={this.onSelect}
				defaultExpandAll={true} >
				{this.constructParentNode(data,formName)}
				</Tree>
				</Card>
				)}
				</Row>
				</div>
				</TabPane>
				} 
				</Tabs>
				{ treeData && treeData.parentList && treeData.parentList.length > 0 &&
					<div style={{marginTop:8}}>
				<Pagination onChange={(page,pageSize)=> this.setState({parentOffSet : (page-1)*10,parentLimit : page*10 } )}   total={treeData.parentList.length} />
				</div>
				}
				{treeData && treeData.childrenList && treeData.childrenList.length > 0 &&
					<div style={{marginTop:8}}>
				<Pagination onChange={(page,pageSize)=> this.setState({childOffSet : (page-1)*10,childLimit : page*10 } )}  total={treeData.childrenList.length} />
				</div>
				}
				</Spin> </Col> }
				</Row>
				</Spin>
				</div>
		);

			}

		}


		function mapStateToProps(state) {
			return {
				getFormFileData: state.get('intraWeb').get('getFormFileData').get('data'),
				count: state.get('intraWeb').get('getFormFileData').get('count'),
				searchData: state.get('intraWeb').get('getFormFileSearchData')
			};
		}

		export default withRouter(connect(mapStateToProps)(fileHierarchy));
