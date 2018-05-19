import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
        <header className="_header">
          <div className="w-header">
            <div className="lp-header">
              SIMPLY-UPLOAD
            </div>
            {/* <!-- end of lp header --> */}
            <div className="rp-header">
              Welcome Oladimillion / &nbsp;
              <a href="javascript:void">Logout</a>
            </div>
            {/* <!-- end of rp header --> */}
          </div>
          {/* <!-- end of w header --> */}
        </header>
    )
  }
}

export default Header;
