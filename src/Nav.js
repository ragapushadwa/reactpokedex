import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon, Layout, Breadcrumb } from 'antd';
import Title from 'antd/lib/skeleton/Title';

// const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

function Nav() {
    const navStyle = {
        color: 'white'
    }

    const handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    return (
        // <nav>
        //     <h1>Logo</h1>
        //     <ul className="nav-links">
        //         <Link style={navStyle} to="/wild-pokemon-list">
        //             <li >List</li>
        //         </Link>
        //         <Link style={navStyle} to="/my-pokemon-list">
        //             <li>My List</li>
        //         </Link>
        //     </ul>
        // </nav>

        <Header style={{  backgroundColor:'#91d5ff', position: 'fixed', zIndex: 1, width: '100%' }}>
            {/* <div className="logo" /> */}
            {/* <Title level={3}>PokeNyamm</Title> */}
            
            <Menu
                // theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['all']}
                style={{ lineHeight: '64px', backgroundColor:'#91d5ff' }}
                mode="horizontal"
            // onClick={handleClick}
            // selectedKeys={[this.state.current]}
            >
                <Menu.Item key="all">
                    <Link to="/rtp/wild-pokemon-list">
                        <Icon type="appstore" />
                        All
                </Link>
                </Menu.Item>

                <Menu.Item key="alipay">
                    <Link to="/rtp/my-pokemon-list">
                        <Icon type="mail" />
                       My Pokemon
                </Link>
                </Menu.Item>

                {/* <Menu.Item key="mail">
                <Icon type="mail" />
                All
            </Menu.Item> */}
                {/* <Menu.Item key="app" disabled>
                <Icon type="appstore" />
                Navigation Two
            </Menu.Item> */}

                {/* <Menu.Item key="alipay">
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                    Navigation Four - Link
                </a>
            </Menu.Item> */}

            </Menu>
        </Header>
    )
}

export default Nav
