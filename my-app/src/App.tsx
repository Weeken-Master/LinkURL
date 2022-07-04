import React, { useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import './App.css';
import { PoweroffOutlined, RestFilled, SettingFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {Column } from '@ant-design/plots';
import { UserOutlined, AudioOutlined ,LinkOutlined ,CopyOutlined ,AppstoreAddOutlined } from '@ant-design/icons';
import { Avatar, Image, Radio,RadioGroupProps } from 'antd';
import { Breadcrumb, Layout, Menu , Card, Drawer } from 'antd';
import { AutoComplete, Input } from 'antd';
import { Col, Row } from 'antd';
import { Pie, measureTextWidth } from '@ant-design/plots';
import type { SelectProps } from 'antd/es/select';
import type { RadioChangeEvent } from 'antd';
import { FilterOutlined,EditOutlined  } from '@ant-design/icons';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Select } from 'antd';
import { Checkbox } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {  Modal } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import ReactDOM from 'react-dom';
import { getalllink} from './Service/service';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import axios from 'axios';
import { url } from 'inspector';
import { Console } from 'console';
import { Link } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout;




const App: React.FC = () => {

  const[checkload, setcheckload]= useState(true);
  const[data, setdata] = useState([]);
  const[datadetail, setdatadetail]= useState([]);
  // luu gia tri url goc
  const [textURL, setTextURL] = useState("");




  const [link, setLink] = useState({
    time:"",
    linkDefault: "",
    id: "",
    count:"",
  });
  
  //s luu gia tri tuy chinh
  const [textURLs, setTextURLs] = useState("");
  useEffect(() => {
    getalllink()
    .then(results => {
      setdata(results);
    });
  
  }, [checkload, link]);




  async function postdata(){
 
    console.log(textURL);
  
    const response = await axios.post("http://localhost:8080/api/add",  textURL);
   
  }

  async function getdatachart(){
 
    console.log(link.id)
    const response = await axios.post("http://localhost:8080/api/",  link.id);

     console.log(response)
  
   
  }





// button create url ngẫu nhiên
const [loadings, setLoadings] = useState<boolean[]>([]);
const enterLoading = (index: number) => {
  setLoadings(prevLoadings => {
    const newLoadings = [...prevLoadings];
    newLoadings[index] = true;
    return newLoadings;
  });

  setTimeout(() => {
    setLoadings(prevLoadings => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  }, 1000);
};
// chart


const DemoColumn = () => {
  const data = [
    {
      type: link.time,
      sales: link.count,
    },
  
    
   
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    columnWidthRatio: 0.8,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Ngày tháng',
      },
      sales: {
        alias: 'Số lần click',
      },
    },
  };
  return <Column {...config} />;
};


// pie tròn


const DemoPie = () => {
  const data = [
    {
      type: link.time,
      value: link.count,
    },
   
   
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '',
      },
    },
  };
  return <Pie {...config} />;
};
  // 


  // modal ngẫu nhiên

 

  //

// modal

const onChangeinputurl = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  console.log('Change:', e.target.value);
};
const [isModalVisible, setIsModalVisible] = useState(false);

const showModal = () => {
  setIsModalVisible(true);
};

const handleOk = () => {
  postdata();
  
  setcheckload(false);
  setIsModalVisible(false);
};

const handleCancel = () => {
  setIsModalVisible(false);
};



// tuy chinh

// const times= new Date().toLocaleString();
var times= new Date('05/04/2021 14:52');
var now = new Date;
var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , 
      now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
function posturlcreate(){

  setcheckload(true)
  axios.post('http://localhost:8080/api/user-add', {
    count: 0,
    id:textURLs,
    linkDefault:textURL,
    time:utc_timestamp
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
const [isModalVisible1, setIsModalVisible1] = useState(false);

const showModal1 = () => {
  setIsModalVisible1(true);
};

const url =""
const handleOk1 = () => {

  posturlcreate();
  setcheckload(false);
  
  setIsModalVisible1(false);
};

const handleCancel1 = () => {
  setIsModalVisible1(false);
};



//
  const suffix = (
    
     
      <CopyOutlined 

      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );
  // Drawe
  const [visible, setVisible] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

 
  
 const  onclickLink=()=>{

    window.location.assign("http://localhost:3000/"+ link.id);
  }
  const onClose = () => {
    setVisible(false);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };


  // checkbox

  function onChangecheckbox(value: any){
    setLink(value)
  }
  // const onChangecheckbox = (checkedValues: CheckboxValueType[]) => {
  //   console.log('checked = ', checkedValues);

  //   setLink(checkedValues)
    
  // };

//  end
  const { Option } = Select;
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const [value, setValue] = useState(0);
  const [size, setSize] = useState<SizeType>('large');

  const onChange = (e: RadioChangeEvent) => {

  }
  const onChangeClick = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    setLink(data[e.target.value]);
  };


  return (
  <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="space-align-container">
        <div className="test">
          <div className="test">
            <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 32 }} />} />
            <Button  onClick={getdatachart} type="primary">User</Button>
          </div>
        </div>
      </div>
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <Breadcrumb style={{ margin: '16px 0', }}>
        <Breadcrumb.Item>HOME</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 1000 }}>

        <Card type="inner" title="Link" extra={

            <Space style={{ width: '100%' }}>
            
            <Button
              type="primary"
              icon={<AppstoreAddOutlined />}
              
              onClick={showModal}
            >
              Tạo ngẫu nhiên
            </Button>

            <Button
              type="primary"
              icon={<PoweroffOutlined />}
              
               onClick={showModal1}
            >
              Tạo tùy chỉnh
            </Button>
            </Space>

        }>
         <div className='header-radion-check'>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Date Create</Radio>
            <Radio value={2}>Top Performing</Radio>
           
          </Radio.Group>


         </div>
         <div className='header-radion-check'>
          <Button type="primary" shape="round" icon={<FilterOutlined/>} size={size}>
          Download
          </Button> 
          <Select defaultValue="lucy" style={{ width: 120, marginLeft:"1rem", marginTop:"0.3rem" }} loading>
          <Option value="lucy">Lucy</Option>
          <Option value="lucy2">Lucy2</Option>
          </Select>
    


         </div>
        </Card>
          
        <div className="site-card-wrapper" style={{}}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Link history" bordered={false} style={{backgroundColor:"#40a9ff"}}
              extra={

                <Space style={{ width: '100%' }}>
                
                <Button
                  type="primary"
                  icon={<PoweroffOutlined />}
                  loading={loadings[2]}
                  onClick={() => enterLoading(2)}
                />
                </Space>
              }
              >
               
               <div className=''>
               <Radio.Group onChange={onChangeClick} value={value}>
               {data.map((item, i) => {
                  return (
                      <>
                      <Card   bordered={true} style={{backgroundColor:"", marginTop:"1rem"}} >
                      <label key={i} >{item['time']}</label> <br/>

            
                      <Row>
                      <Col span={8}>
                      <Radio value={i}>{item['linkDefault']}
                     
                      <br/>
                      <span style={{color:"#eb2f96"}}  >http://localhost:3000/{item['id']}</span>
                      </Radio>

                    </Col>
                      </Row>
                      
                     

                      <span className='space-align-container'>Số lần click: <b>{item['count']}</b></span>
                    </Card>
                    </>
                  );
                })}
              
            </Radio.Group>

              
              
               
               </div>
               



              </Card>
            </Col>
            <Col span={16}  >

          
              <Card title="Detail Url" bordered={false} >
                   <b style={{fontSize:"1.5rem"}}>{link.linkDefault}</b>
                   <h4>Time:{link.time}</h4>

                   
                  
              <div className='edit'>
              <Button   className='' type="primary" shape="round" onClick={showDrawer} icon={<EditOutlined />} size={size}>
                    Edit link
              </Button> 
              </div>
              </Card>
              <Drawer
                title="Edit Link"
                width={520}
                closable={false}
                onClose={onClose}
                visible={visible}
              >
                
              </Drawer>
             
            
              <Input size="large"  value={"http://localhost:3000/"+ link.id} prefix={<LinkOutlined onClick={onclickLink} /> } suffix={suffix}/>
              <br/>
              <br/>
              <DemoColumn />

              <br/>
              <DemoPie />
            </Col>
           
          </Row>
        </div>


      </div>

      <Modal title="Tạo link rút gọn ngẫu nhiên" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <b>Nhập đường dẫn gốc</b> 
        <Input   placeholder="Link" value={textURL}  style={{marginTop:"0.5rem"}} onChange={e => setTextURL(e.target.value)} />
      </Modal>

      <Modal title="Tạo link rút gọn tủy chỉnh" style={{color:"#0050b3"}} visible={isModalVisible1} onOk={handleOk1} onCancel={handleCancel1}>
        <b >Nhập đường dẫn gốc</b> 
        <Input placeholder="Link" value={textURL}  style={{marginTop:"0.5rem"}} onChange={e => setTextURL(e.target.value)}  />
        <b style={{marginTop:"0.5rem"}} >Tùy chỉnh</b>
        <Input placeholder="Link tủy chỉnh" showCount={true} maxLength={16} value={textURLs}  style={{marginTop:"0.5rem"}} onChange={e => setTextURLs(e.target.value)} />
      </Modal>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
    );
  };
export default App;