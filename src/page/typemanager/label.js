
import React, {useState, Component, useRef, useImperativeHandle, forwardRef,createRef } from 'react';
const FocusInput = React.forwardRef((
  props,
  ref,
) => {
  const cref = useRef()
  const [value, setValue] = useState('')
  const handleClear = () => {
    console.log('handle clear')
  }
  useImperativeHandle(ref, () => ({
    handleClear
  }))
  const changeValue = () => {
   		props.saber()
  } 
  return (
    <div>
      <h1>test</h1>
      <button type="button" onClick={changeValue}>子组件的button</button>
      {props.size}
    </div>
  )
})


const bindRef = (WrappedComponent) => {
    const ConvertRef = (props) => {
        const { forwardedRef, ...other } = props;
        console.log(forwardedRef);
        return <WrappedComponent {...other} ref={forwardedRef} />;
    };
    // “ref”是保留字段需要用普通的字段来代替，传递给传入的组件
    return React.forwardRef((props, ref) => {
        console.log(ref);
        return <ConvertRef {...props} forwardedRef={ref} />;
    });
};

const FocusInputWithRef = bindRef(FocusInput);

class ForwardRef extends Component {
    constructor(props) {
        super(props);
        this.state = {
			selectedRowKeys: [], // Check here to configure the default column
			tabledata: [],
			selectedRows:[],
			page: 1,
			size: 10,
			name: '',
			total:0,
			type:1, //1是添加，二是修改
			visible: false,
			vtitle: '添加'
		};
        this.ref = createRef();
        
    }

    componentDidMount() {
        const { current } = this.ref;
        //current.focus();
    }
		test = () => {
			this.setState({
				size: 20,
			})
    	this.ref.current.handleClear()
  	}
		saber = () => {
			alert("sad")
		}
    render() {
        return (
            <div>
                <p>forward ref</p>
                <FocusInputWithRef ref={this.ref} size={this.state.size} saber={this.saber} />
                <button onClick={this.test}>test</button>
            </div>
        );
    }
    
}
export default ForwardRef;