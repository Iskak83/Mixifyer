/* eslint-disable complexity */
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import SearchBar from './SearchBar'

const Navbar = ({user, handleLogout, isLoggedIn, shoppingCart}) => {
  const [menue, setMenue] = useState(true)
  function onClickBurger() {
    setMenue(!menue)
  }
  var onClickLinks =
    window.innerWidth < 800
      ? () => {
          console.log('>>>>> mobile')
          return setMenue(true)
        }
      : null

  const [mouseOver, setMouseOver] = useState(false)
  const userAccountLinks = idName =>
    !isLoggedIn ? (
      <div id={idName}>
        <Link to="/login" onClick={onClickLinks}>
          LOGIN
        </Link>
        <Link to="/signup" onClick={onClickLinks}>
          SIGN UP
        </Link>
      </div>
    ) : (
      <div id={idName}>
        <Link to="/account" onClick={onClickLinks}>
          ACCOUNT
        </Link>
        <a href="#" onClick={handleLogout}>
          LOGOUT
        </a>
      </div>
    )

  const accountNav = (
    <div
      className="user-account-nav"
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <h6>Hello, {isLoggedIn ? `${user.firstName}` : 'Login'}</h6>
      <span className="arrow-down" />

      {mouseOver && (
        <div className="account-links-container">
          <div className="arrow-up" />
          {userAccountLinks('account-links')}
        </div>
      )}
    </div>
  )

  // ) : (
  //   <div className="accountNav">
  //     <h6>Hello, {user.name} </h6>
  //     <div id="account-nav-div">
  //       <Link to="/account">ACCOUNT</Link>
  //       <a href="#" onClick={handleLogout}>
  //         LOGOUT
  //       </a>
  //     </div>
  //   </div>
  // )

  const linksClass = !menue ? 'nav-links-burger' : 'nav-links-x'
  const burgerFirstLine = menue ? 'first-line-burger' : 'first-line-x'
  const burgerSecondLine = menue ? 'second-line-burger' : 'second-line-x'

  const cart = idName => (
    <div className="shopCart-container">
      <Link to="/shopping-cart" onClick={onClickLinks} id={idName}>
        <div id="cart-body">
          <div id="cart-left" />
          <div id="cart-bottom">{shoppingCart.totalQuantity}</div>
          <div id="cart-right" />
          <div id="cart-handle" />
        </div>
        <div id="wheels">
          <div className="wheels" />
          <div className="wheels" />
        </div>
      </Link>
    </div>
  )
  return (
    <div id="nav-bar">
      <nav>
        <div className="burger" onClick={onClickBurger}>
          <p id={burgerFirstLine} />
          <p id={burgerSecondLine} />
        </div>
        <Link onClick={onClickLinks} to="/home" id="label">
          Mixifyer
        </Link>
        {window.innerWidth <= 800 && cart('shopping-cart-mobile')}
        <div className={linksClass}>
          <SearchBar />
          <Link to="/home" onClick={onClickLinks}>
            HOME
          </Link>
          <Link to="/spirit/products" onClick={onClickLinks}>
            SPIRITS
          </Link>
          <Link to="/non-alcoholic/products" onClick={onClickLinks}>
            NON-ALCOHOLIC
          </Link>
          <Link to="/bitter/products" onClick={onClickLinks}>
            BITTERS
          </Link>
          {accountNav}
          {window.innerWidth <= 1025 &&
            userAccountLinks('account-links-mobile')}
          {cart('shopping-cart')}
        </div>
        {/* // : (
        //   <div className={linksClass}>
        //     <SearchBar />
        //     <Link to="/home" onClick={() => onClickLinks()}>
        //       HOME
        //     </Link>
        //     <Link to="/spirit/products" onClick={() => onClickLinks()}>
        //       SPIRITS
        //     </Link>
        //     <Link to="/non-alcoholic/products" onClick={() => onClickLinks()}>
        //       NON-ALCOGOLIC
        //     </Link>
        //     <Link to="/bitter/products" onClick={() => onClickLinks()}>
        //       BITTERS
        //     </Link>
        //     <Link to="/login" onClick={() => onClickLinks()}>
        //       LOGIN
        //     </Link>
        //     {cart('shopping-cart')}
        //   </div>
        // )} */}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id,
    shoppingCart: state.shoppingCart
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
