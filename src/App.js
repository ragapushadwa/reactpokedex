import React, { useState, useEffect } from 'react';
import Nav from './Nav'
import MyPokemonList from './pages/MyPokemonList'
import WildPokemonList from './pages/WildPokemonList'
import WildPokemonDetail from './pages/WildPokemonDetail'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './index.css'

import { Layout, Breadcrumb } from 'antd';
const { Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout>

        {/* <div className="app"> */}
        <Nav />

        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}

          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}
              <Route exact path="/rtp" component={WildPokemonList} />
              <Route path="/rtp/my-pokemon-list" component={MyPokemonList} />
              <Route path="/rtp/wild-pokemon-list" component={WildPokemonList} />
              <Route path="/rtp/wild-pokemon-detail/:id" component={WildPokemonDetail} />
            </Switch>
          </div>

        </Content>

        {/* </div> */}
      </Layout>

    </Router>
  );
}

export default App;
