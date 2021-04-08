import React from 'react';
import { Form, Input } from 'antd';
import 'antd/dist/antd.css';
import './SearchInput.css'
class SearchInput extends React.Component {
  state = {
    historyData: {
      id: 1,
      value: "one",
      children: [{
        id: 2,
        value: "one-1",
        children: [
          { id: 4, value: "two-1" },
          { id: 5, value: "two-2" }
        ]
      },
      { id: 3, value: "one-2" }
      ]
    },
    searchData: []
  }
  // 递归处理child数据
  queryData = (childList, params) => {
    let listArr = []
    childList.forEach(item => {
      if (item.value.indexOf(params) !== -1) {
        listArr.push({
          id: item.id,
          value: item.value
        })
        this.setState({
          searchData: [...this.state.searchData, ...listArr]
        })
      }
      if (item.children) {
        this.queryData(item.children, params)
      }
    })
  }
  // 表单input
  Demo = () => {
    const { historyData } = this.state
    const layout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 4 },
    };
    // 输入事件
    const handleChange = (e) => {
      const value = e.target.value
      if (value.trim() === "") {
        return this.setState({
          searchData: []
        })
      }
      this.setState({
        searchData: []
      }, () => {
        if (historyData.value.indexOf(value) !== -1) {
          this.setState({
            searchData: [{
              id: historyData.id,
              value: historyData.value
            }]
          }, () => {
            this.queryData(historyData.children, value)
          })
        } else {
          this.queryData(historyData.children, value)
        }
      })
    }
    return (
      <Form
        {...layout}
        onChange={handleChange}
      >
        <Form.Item
          label="SearchInput"
        >
          <Input />
        </Form.Item>
      </Form>
    );
  };
  render() {
    return (
      <div className="cantainer">
        {this.Demo()}
        <ul className="content">
          {this.state.searchData.map(item =>
            <li key={item.id}>{item.value}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default SearchInput;
//expand(12); // 期望返回 '10 + 2' expand(42); // 期望返回 '40 + 2' expand(70304); // 期望返回 '70000 + 300 + 4'
    // var expand = function (params) {
    //     var strnum = params.toString()
    //     var arrNum = strnum.split('')
    //     var len = arrNum.length
    //     var doneNum = ""
    //     arrNum.forEach((item, index) => {
    //         if(item == 0) return
    //         doneNum += `${item * Math.pow(10,len - 1 - index)} ${len -1 === index ? "" : "+ "}`
    //     })
    //     return doneNum
    // }
    // 倒叙不用算位数
    // var expand = function (params) {
    //     var strnum = params.toString()
    //     var arrNum = strnum.split('')
    //     var orderArr = arrNum.reverse()
    //     var len = arrNum.length
    //     var doneNum = ""
    //     arrNum.forEach((item, index) => {
    //         if(item == 0) return
    //         doneNum += `${item * Math.pow(10,index)} ${len -1 === index ? "" : "+ "}`
    //     })
    //     return doneNum
    // }
    // console.log(expand(12))
    // console.log(expand(42))
    // console.log(expand(70304))

    // console.log("开始");
    // async function async1() {
    //     await async2();
    //     console.log("async1结束");
    // }
    // async function async2() {
    //     console.log("async2结束");
    // }
    // async1();
    // setTimeout(function () {
    //     console.log("setTimeout");
    // }, 0);
    // new Promise((resolve) => {
    //     console.log("Promise开始");
    //     resolve();
    // }).then(function () {
    //     console.log("promise1结束");
    // }).then(function () {
    //     console.log("promise2结束");
    // });
    // console.log("结束");

    //解： 先打印  "开始" , "async2结束（await关键字使代码变成同步执行）" , "Promise开始" , "结束" ; 因为JavaScript是单线程的，从上而下执行代码，所有的同步任务都会在主线程中执行。
    //     之后打印  "async1结束" , "promise1结束" , "promise2结束" , "setTimeout"  等待主线程中的任务执行完后，系统会依次读取任务队列里的事件，
    //     对应的就是异步任务进入主线程，开始执行。 异步任务之间存在优先级不同的任务， 微任务（如：Promise） 和 宏任务（如：setTimeout）,
    //     宏任务的优先级高于微任务，每一个宏任务执行完毕都必须将当前的微任务队列清空