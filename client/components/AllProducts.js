import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {thunkFetchAllProducts, thunkRemoveProduct} from '../store/products'
import {Link} from 'react-router-dom'
import CreateProductForm from './CreateProductForm'

// eslint-disable-next-line complexity
const AllProducts = ({
  products,
  getProducts,
  user,
  deleteProduct,
  searchBar,
  ...props
}) => {
  useEffect(() => {
    getProducts()
  }, [])
  function removeProduct(id) {
    deleteProduct(id)
  }

  const [state, setstate] = useState({singleId: ''})
  const [newFormState, setNewFormState] = useState(false)

  const toggleCreateForm = () => {
    setNewFormState(!newFormState)
  }

  const toggleForm = id => {
    if (state.singleId !== id) {
      setstate({
        singleId: id
      })
    } else {
      setstate({
        singleId: ''
      })
    }
  }

  const {categoryOrTypeOrFlavor} = props.match.params

  if (categoryOrTypeOrFlavor) {
    console.log(props)
    products = products.filter(
      product =>
        product.type === categoryOrTypeOrFlavor ||
        product.flavor === categoryOrTypeOrFlavor ||
        product.category === categoryOrTypeOrFlavor
    )
  }

  if (searchBar.length) {
    products = products.filter(singleProd => {
      return singleProd.name.toLowerCase().includes(searchBar.toLowerCase())
    })
  }

  const productStyle = !user.isAdmin ? 'product' : 'productAdmin'
  const productsBoxStyle = !user.isAdmin ? 'productsBox' : 'productsBoxAdmin'
  const productInfoStyle = !user.isAdmin ? 'productInfo' : 'productInfoAdmin'
  return (
    <div className={productsBoxStyle}>
      <div className="newFormToggle">
        {user.isAdmin && (
          <button
            type="button"
            onClick={() => toggleCreateForm()}
            id="toggle-button"
          >
            {!newFormState ? 'Create New Product' : 'Close Form'}
          </button>
        )}
        {newFormState && <CreateProductForm />}
      </div>
      {!products.length && searchBar.length ? (
        <div>No Products Match Your Search</div>
      ) : null}
      {!products.length && !searchBar.length ? (
        <div>Loading...</div>
      ) : (
        products.map(product => (
          <div key={product.id} id={productStyle}>
            <Link to={`/products/${product.name}`}>
              <img src={product.image} />
            </Link>
            <div>
              <div className={productInfoStyle}>
                <div>
                  <Link to={`/products/${product.name}`}>
                    <h3>{product.name}</h3>
                  </Link>

                  {user.isAdmin ? (
                    <div>
                      <h5>Category: {product.category}</h5>
                      <h5>Type: {product.type}</h5>
                      <h5>Flavor: {product.flavor}</h5>
                    </div>
                  ) : (
                    <h5>
                      <span>
                        <Link to={`/${product.type}/products/`}>
                          <h5>{product.type} </h5>
                        </Link>
                      </span>
                      <span>
                        <Link to={`/${product.flavor}/products`}>
                          <h5>{product.flavor}</h5>
                        </Link>
                      </span>
                    </h5>
                  )}

                  <h5>Price: {product.price / 100} $</h5>
                  <h5>Volume: {product.volume} oz</h5>
                  <h5>Available: {product.inStock}</h5>
                </div>
                {state.singleId === product.id && (
                  <CreateProductForm
                    currentProduct={product}
                    products={products}
                    setNewFormState={setNewFormState}
                    setState={setstate}
                  />
                )}
              </div>
              {user.isAdmin && (
                <div>
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className="delete-button"
                  >
                    Remove the product
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleForm(product.id)}
                    className="toggle-button"
                  >
                    {product.id === state.singleId
                      ? 'Cancel'
                      : 'Edit the product'}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

const mapState = state => {
  return {
    products: state.products,
    user: state.user,
    searchBar: state.searchBar
  }
}

const mapDispatch = dispatch => {
  return {
    deleteProduct: id => dispatch(thunkRemoveProduct(id)),
    getProducts: () => dispatch(thunkFetchAllProducts())
  }
}

export const Products = connect(mapState, mapDispatch)(AllProducts)
