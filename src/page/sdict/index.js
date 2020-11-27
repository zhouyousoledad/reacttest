import React, {useState, Component, useRef, useImperativeHandle, forwardRef,createRef } from 'react';
import ReactDOM from 'react-dom';

import { dictlist,dictadd,dictdelete,dicteduit } from '../../axios/api';
import './index.css';
import { Table, Row, Col, Input, Button, Modal, Form,message} from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined,ExclamationCircleOutlined,EditOutlined } from '@ant-design/icons';
import Details from './sdictdetail.js'
const { confirm } = Modal;
const Dictform = React.forwardRef((
  props,
  ref,
) => {
  const cref = useRef()
  const [form] = Form.useForm();
	const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 30,
  },
};
  const handleClear = () => {
    form.resetFields();
  }
  const eduitfu = (data) =>{
  	form.setFieldsValue({
  		'name':data.name,
  		'description':data.description
  	})
  }
  useImperativeHandle(ref, () => ({
    handleClear,
    eduitfu
  }))
	const otherBtnClick = () => {
		form.validateFields().then((values) => {
				props.onCreate(values);
		}).catch((info) => {

		});
	}
	const validateName = (rule, value) => {
        return new Promise(async (resolve, reject) => {
            if (!value) {
                await reject('请输入名称')
            } else if (value.length > 50) {
                await reject('名称长度不能大于50位')
            } else {
                await resolve()
            }
        })
    }
	const validateDesign = (rule, value) => {
        return new Promise(async (resolve, reject) => {
            if (!value) {
                await reject('请输入描述')
            } else if (value.length > 255) {
                await reject('描述长度不能大于255位')
            } else {
                await resolve()
            }
        })
    }
  return(
		<div>
    	<Modal title={props.title} visible={props.visible} onOk={otherBtnClick} onCancel={props.onCancel} okText="确定" cancelText="取消">
       
      <Form {...layout} form={form}>
            <Form.Item label="字典名称" name='name' rules={[{required: true, validator: validateName}]}>
              <Input placeholder='请输入' />
            </Form.Item>
						<Form.Item label="描述" name='description' rules={[{required: true, validator: validateDesign}]}>
              <Input placeholder='请输入' />
            </Form.Item>
      </Form>
      </Modal>
    </div>
	);
})
const bindRef = (WrappedComponent) => {
    const ConvertRef = (props) => {
        const { forwardedRef, ...other } = props;
        //console.log(forwardedRef);
        return <WrappedComponent {...other} ref={forwardedRef} />;
    };
    // “ref”是保留字段需要用普通的字段来代替，传递给传入的组件
    return React.forwardRef((props, ref) => {
        //console.log(ref);
        return <ConvertRef {...props} forwardedRef={ref} />;
    });
};

const DictformWithRef = bindRef(Dictform);


class Demo extends React.Component {
	constructor(props) {
		super(props)
		this.ref = createRef();
		this.child = createRef();
		this.columns = [{
		title: '名称',
		key: 'name',
		width: 150,
		dataIndex: 'name',
	},
	{
		title: '描述',
		width: 150,
		key: 'description',
		dataIndex: 'description',
	},
	{
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 250,
    render: (text, record) => (
    	<div>
        <Button type="primary" className="seracherbutton" onClick={() => this.eduitdict(record)} icon={<EditOutlined />}>编辑</Button>
        <Button type="primary" danger className="seracherbutton marginle" onClick={() => this.delinnerdict(record)} icon={<DeleteOutlined />}>删除</Button>
      </div>
    ),
  },
];
		this.state = {
			selectedRowKeys: [], // Check here to configure the default column
			tabledata: [],
			selectedRows:[],
			page: 1,
			size: 10,
			name: '',
			findname:'',
			total:0,
			id:'',
			type:1, //1是添加，二是修改
			visible: false,
			vtitle: '添加',
			detailvisible:false
		};
	}
	onSelectChange = (selectedRowKeys, selectedRows) => {
		this.setState({
			selectedRowKeys,
			selectedRows
		});		
	};
	render() {
		const {
			selectedRowKeys
		} = this.state;

		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
			hideDefaultSelections: true,
		};

		return(
			<div className="dictlcass">
    <Row className="dictcontent" gutter={16}>
      <Col className="gutter-row dictleft" span={12}>
        <div className="dictinner">
        <div className="marginbo">
        <Input value={this.state.name} onChange={this.updateStateProp} className="seracherinpuy" placeholder="请输入名称" />
        <Button type="primary" className="seracherbutton" onClick={this.seracher} icon={<SearchOutlined />}>搜索</Button>
        </div>
        <div className="marginbo">
        <Button type="primary" className="seracherbutton" onClick={this.adddict} icon={<PlusOutlined />}>新增</Button>
        <Button type="primary" danger className="seracherbutton marginle" onClick={this.deloutdict} icon={<DeleteOutlined />}>删除</Button>
        </div>
        <Table
        columns={this.columns}
        dataSource={this.state.tabledata}
        scroll={{y: 300 }}
        onRow={record => {
    			return {
      			onClick: event => {
      				this.setState({
								findname: record.name,
							});
							setTimeout(()=>{
								this.child.current.getlist(record.name)
							},0)
      			}, // 点击行
    			};
  			}}
        pagination={{ 
        	defaultPageSize:5,
        	total:this.state.total,
        	showTotal: () => '共'+this.state.total+'条',
        	itemRender:this.onShowSizeChange
        }}
        rowSelection={rowSelection}
      />
        </div>
      </Col>
      <Col className="gutter-row dictright" span={12}>
        <div className="dictinner-out">
        <div className="deatil-content">
        		<div className="deatil-head">
        				<span>字典详情</span>
        				{ 
        					this.state.findname ?<span className="right"><Button type="primary" size='small' className="seracherbutton" onClick={this.openchild} icon={<PlusOutlined />}>新增</Button></span>:''
								}
        		</div>
        		<div className="deatil-bottom">
        				{ 
        					this.state.findname ?<div><Details ref={this.child} visible={this.state.detailvisible} pfn={this.fn.bind(this)}></Details></div>:
									<div className="detaul-tip"><span>点击字典查看详情</span></div>
								}
        		</div>
        </div>
        </div>
      </Col>
      
    </Row>
    <DictformWithRef ref={this.ref} title={this.state.vtitle}  visible={this.state.visible} onCreate={this.handleOk} onCancel={this.handleCancel}/>
    
    </div>
		)
	}
	onShowSizeChange(current, type, originalElement) {
		if(type === 'prev') {
			return <a>上页</a>;
		}
		if(type === 'next') {
			return <a>下页</a>;
		}
		return originalElement;
	}
	deloutdict = () =>{
		if(this.state.selectedRows.length == 0){
			message.error('请选择需要删除的数据');
		}else{
			var _this = this
			confirm({
    		title: '提示',
    		icon: <ExclamationCircleOutlined />,
    		content: '您确定要删除所选中的数据吗？',
    		okText: '确定',
    		cancelText: '取消',
    		onOk() {
      		var arr = []
      		
			_this.state.selectedRows.forEach(v=>{
				arr.push(v._id)
			})
			var a={
				"id":arr.join(',')
			}
			dictdelete(a).then(res=>{
				message.success('删除成功');
				_this.getlist()
			})
    		},
    		onCancel() {
      		
    		},
  		});
			
		}
	}
	seracher = () =>{
		this.setState({
			page: 1,
		});
		this.getlist()
	}
	adddict = () => {
		this.setState({
			visible: true,
			type:1,
			vtitle:'新增'
		});
		this.ref.current.handleClear()
	}
	delinnerdict = (row) =>{
		var _this = this
			confirm({
    		title: '提示',
    		icon: <ExclamationCircleOutlined />,
    		content: '您确定要删除这条数据吗？',
    		okText: '确定',
    		cancelText: '取消',
    		onOk() {
      		var arr = []
			var a={
				"id":row._id
			}
			dictdelete(a).then(res=>{
				message.success('删除成功');
				_this.getlist()
			})
    		},
    		onCancel() {
      		
    		},
  		});
	}
	eduitdict = (row) =>{
		this.setState({
			visible: true,
			type:2,
			vtitle:'编辑',
			id:row._id
		});
		this.ref.current.eduitfu(row)
	}
	handleOk = (values) => {
		var obj = JSON.parse(JSON.stringify(values))
		if(this.state.type == 1){
			dictadd(obj).then(res=>{
				this.handleCancel()
				message.success('添加成功');
				this.getlist()
			})
		}else{
			obj.id = this.state.id
			dictadd(obj).then(res=>{
				this.handleCancel()
				message.success('修改成功');
				this.getlist()
			})
		}
		
	};
	handleCancel = e => {
		this.setState({
			visible: false,
		});
	};
	updateStateProp = (e) =>{
		this.setState({
			name: e.target.value,
		});
	}
	getlist = () => {
		var data = {
			"page": this.state.page,
			"size": this.state.size,
			"name": this.state.name
		}
		dictlist(data).then(res => {
			res.data.data.forEach((v,index)=>{
				v.key = index
			})
				this.setState({
					tabledata: res.data.data,
					total:res.data.total,
					selectedRowKeys:[],
					selectedRows:[]		
				});
		})
	}
	openchild = () => {
		this.setState({
			detailvisible: true,
		});
	}
	fn =(data) =>{
		this.setState({
			detailvisible: data,
		});
  }
	componentDidMount() {
		this.getlist()
	}
}

//ReactDOM.render(<Demo />, document.getElementById('container'));
export default Demo
/**
 * ┌───┐   ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┐
 * │Esc│   │ F1│ F2│ F3│ F4│ │ F5│ F6│ F7│ F8│ │ F9│F10│F11│F12│ │P/S│S L│P/B│  ┌┐    ┌┐    ┌┐
 * └───┘   └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┘  └┘    └┘    └┘
 * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐ ┌───┬───┬───┐ ┌───┬───┬───┬───┐
 * │~ `│! 1│@ 2│# 3│$ 4│% 5│^ 6│& 7│* 8│( 9│) 0│_ -│+ =│ BacSp │ │Ins│Hom│PUp│ │N L│ / │ * │ - │
 * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤ ├───┼───┼───┤ ├───┼───┼───┼───┤
 * │ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{ [│} ]│ | \ │ │Del│End│PDn│ │ 7 │ 8 │ 9 │   │
 * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤ └───┴───┴───┘ ├───┼───┼───┤ + │
 * │ Caps │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  │               │ 4 │ 5 │ 6 │   │
 * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤     ┌───┐     ├───┼───┼───┼───┤
 * │ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│  Shift   │     │ ↑ │     │ 1 │ 2 │ 3 │   │
 * ├─────┬──┴─┬─┴──┬┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤ ┌───┼───┼───┐ ├───┴───┼───┤ E││
 * │ Ctrl│    │Alt │         Space         │ Alt│    │    │Ctrl│ │ ← │ ↓ │ → │ │   0   │ . │←─┘│
 * └─────┴────┴────┴───────────────────────┴────┴────┴────┴────┘ └───┴───┴───┘ └───────┴───┴───┘
 */