import './style.css'
import React, { useEffect, useState } from 'react'
import { formatCurrency } from '../../ultil'
import { ProductContext } from '../../components/Context'
import { Link, useNavigate } from 'react-router-dom'
import { formatter } from '../../ultil'
export const voucherlist = [
    {
        code: "VOUCHER2022",
        price: 20000
    },
    {
        code: "VOUCHERNOEL",
        price: 15000
    }
]



export const CartPage = () => {

    const navigator = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('current-user') === null) {
            navigator('/login')
        }
    },[localStorage.getItem('current-user')])
    
    const [voucher, setVoucher] = useState()
    const [checked, setChecked] = useState(false)
    const [select, setSelect] = useState([])

    const total = (cart) => {
        var total = 0
        select.forEach(i => (
            total += Number(i.product.product_present_price)
        ))
        return total
    }

    const getTrans = (cart) => {
        return total(cart)*0.01
    }

    const getTotal = (cart) => {
        var sum = 0
        voucherlist.forEach(i => {
            if (i.code === voucher) {
                sum -= i.price
            }
        })

        sum += getTrans(cart) + total(cart)
        return sum
    }
        
    const check = (item) => {
        if(checked) {
            return true
        }
        var selected = select.find(i => i.product.product_name === item.product.product_name)
        if (selected === undefined) {
            return false
        }
        else {
            return true
        }
    }
    

    const handleChange = (item, cart) => {
        setChecked(false)
        var selected = select.find(i => i.product.product_name === item.product.product_name)
        if (selected === undefined) {
            setSelect([...select, item])
            cart.setTmpCart(cart.tmpcart.filter(i => i.product.product_name !== item.product.product_name))
        }
        else {
            setSelect(select.filter(i => i.product.product_name !== item.product.product_name))
            cart.setDataToTmp(item)
        }
    }

    const handelDelete = (item, cart) => {
        var selected = select.find(i => i.product.product_name === item.product.product_name)
        cart.setCart(cart.cart.filter(i => i.product.product_name !== item.product.product_name))
        cart.setTmpCart(cart.tmpcart.filter(i => i.product.product_name !== item.product.product_name))
        setSelect(select.filter(i => i.product.product_name !== item.product.product_name))
    }

    const handleChangeAll = (cart) => {
        setChecked(!checked)
        if (!checked) {
            setSelect(cart.cart)
            cart.setTmpCart([])
        }
        else {
            setSelect([])
            cart.setTmpCart(cart.cart)
        }
    }


    const handleCLick = (cart) => {
        cart.setPayment(select)
        setVoucher()
        setSelect([])
    }
    return (
        <ProductContext.Consumer>
            {
                cart => (
                    <div className='cart-wrapper'>
                        {
                            cart.cart.length < 1 ?
                                    <div className='cart-page__empty'>
                                        <span style={{marginBottom: "27px"}}>
                                            Kh??ng c?? s???n ph???m n??o trong gi??? h??ng
                                        </span>
                                        <button type="button" class="btn btn-outline-warning"><Link to={'/shop'}><a >TI???P T???C MUA S???M</a></Link></button>
                                    </div> :
                                    <div className='cart-page row'>
                            <div className='cart-page__container col-7  '>
                                {
                                    <div className='cart-page__pay'>
                                            <div className="cart-item first">
                                                <div className='cart-select' style={{width: "100%"}}>
                                                    <div className='select-checkbox'>
                                                        <input type="checkbox" onChange={() => handleChangeAll(cart)} checked={checked}/>
                                                        <span>CH???N T???T C??? ({cart.cart.length} S???N PH???M)</span>
                                                    </div>
                                                </div>
                                                <i className="fa-solid fa-trash"></i>
                                            </div>
                                            {
                                                cart.cart.length > 0 && cart.cart.map((i, index) => (
                                                    <div className="cart-item" key={index}>
                                                        <div className='cart-select' style={{width: "100%"}}>
                                                            <div className='select-checkbox'>
                                                                <input type="checkbox" checked={check(i)} onChange={() =>handleChange(i, cart)}/>
                                                                
                                                                <img src={`https://hcmut-e-commerce.herokuapp.com/${i.product.product_image01}`} alt="" className="product-thumbnail"/>
                                                                <div className='cart_product-info'>
                                                                    <span>{i.product.product_name}</span>
                                                                    <span>Th????ng hi???u:<strong style={{color: "rgb(107, 66, 241)"}}> {i.product.product_brand}</strong></span>
                                                                    <span className='discount-info'>Ti???t ki???m {formatCurrency(i.product.product_old_price - i.product.product_present_price)}</span>
                                                                </div>
                                                                <div className="product-detail__line3 cart-detail-2">
                                                                    
                                                                    {
                                                                        <p className="product-detail__line3-current">
                                                                            {formatter.format(i.product.product_old_price)}
                                                                        </p>
                                                                    }
                                                                    <p className="product-detail__line3-discount">{formatter.format(i.product.product_present_price)}</p>
                                                                </div>
                                                                <div className='cart_product-quantity'>
                                                                    <button className='btn btn-outline-primary'>-</button>
                                                                    <span>{i.quantity}</span>
                                                                    <button className='btn btn-outline-primary'>+</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <i className="fa-solid fa-trash"  onClick={() => handelDelete(i, cart)}></i> 
                                                       
                                                    </div>
                                                ))
                                            }
                                        </div>
                                }
                            </div>
                            {
                                <div className='cart-page__cart'>
                                        <span>Th??ng tin ????n h??ng</span>
                                        <div className='cart-detail'>
                                            <span>T???m t??nh ({select.length} s???n ph???m)</span>
                                            <span>{formatCurrency(total(cart))}</span>
                                        </div>
                                        <div className='cart-detail'>
                                            <span>Ch???n m?? gi???m gi??</span>
                                        </div>
                                        <div className="input-group mb-3">
                                            <select className="form-select" aria-label="Default select example" onChange={(e) => setVoucher(e.target.value)}>
                                                <option value="">Kh??ng s??? d???ng</option>
                                                {
                                                    voucherlist.map((i, index) => (
                                                        <option key={index} value={i.code}>
                                                            {i.code}
                                                        </option>
                                                    ))
                        
                                                }
                                            </select>
                                            <button className="btn btn-outline-primary" type="button" id="button-addon2">??p d???ng</button>
                                            </div>
                                        <div className='cart-detail' style={{paddingBottom: "16px"}}>
                                            <strong>T???ng c???ng (???? bao g???m VAT)</strong>
                                            <strong>{formatCurrency(getTotal(cart))}</strong>
                                        </div>
                                        <Link to={`${select.length > 0 ? '/pay' : '#'}`} style={{width: "100%"}}>
                                            <button type="button" className="btn btn-outline-primary col-12" onClick={()=>handleCLick(cart)} 
                                            style={{width: "100%"}}>
                                                
                                                    Ti???p t???c
                                                ({select.length})
                                            </button>
                                        </Link> 
                                        
                                    </div>
                                    }
                        </div>
                        }
                        
                    </div>
                )
            }
        </ProductContext.Consumer>
        
    )
}