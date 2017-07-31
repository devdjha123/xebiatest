import React, { Component } from 'react';

import Header from './PageLayout/Header';
import Footer from './PageLayout/Footer';

class About extends Component {
  render(){
    return(
      <div>
        <div>
          {/* Header part */}
            <Header />
          {/* Header part */}

        <div>
          About Us Page
        </div>

        {/* Footer part */}
          <Footer />
        {/* Footer part */}
        </div>
      </div>
    )
  }
}

export default About;
