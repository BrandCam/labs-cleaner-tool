import React, { useLayoutEffect, useState } from 'react';
import { Container, Button } from '../../components/index';
import { RouteComponentProps } from 'react-router';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosErrorHandler } from '../utils';
import { CheckoutForm, Invoice, InvoiceBox } from './Checkout.styles';
import { NavigationFullscreenExit } from 'material-ui/svg-icons';

interface CheckoutProps extends RouteComponentProps {
  match: any;
}

const Checkout = (props: CheckoutProps) => {
  const [error, setError] = useState<any>({ msg: '', error: false });
  const [stay, setStay] = useState({
    guest_name: '',
    house_id: 0,
    house_name: '',
    check_in: '',
    check_out: '',
    price: 0,
    diff: 0,
    cleaning_fee: 0,
    extra_guests: 0,
    extra_fee: 0,
  });

  console.log(stay);

  const token = localStorage.getItem('token');
  const headers: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com/';

  async function fetchStay() {
    const { id } = props.match.params;
    try {
      const { data }: AxiosResponse = await axios.get(
        `${url}stays/${id}`,
        headers,
      );
      setStay(data);
    } catch (e) {
      axiosErrorHandler(setError);
    }
  }
  useLayoutEffect(() => {
    fetchStay();
  }, []);
  const {
    guest_name,
    house_id,
    house_name,
    check_in,
    check_out,
    price,
    diff,
    cleaning_fee,
    extra_guests,
    extra_fee,
  } = stay;

  const total = +extra_guests * +extra_fee + diff * price + +cleaning_fee;
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <div>
          <h1 data-testid='guest-name'>{guest_name}</h1>

          <div>Nights: {diff}</div>
          <div>Cleaning Fee: ${cleaning_fee}</div>
          {extra_guests && <div>Extra Guests: {extra_guests}</div>}
        </div>
        <div>
          <CheckoutForm>
            <label htmlFor='stay-search' style={{ display: 'hidden' }}>
              Search for different Stay
            </label>
            <input
              id='stay-search'
              name='stay'
              placeholder='Search for different stay'
            />
          </CheckoutForm>
          <Invoice>
            <h3>Invoice</h3>
            <Button
              text={`Pay $${total}`}
              colour='#0aa047'
              datatestid='payment-button'
            />
            <InvoiceBox>
              <span>
                {diff} Nights x ${price}
              </span>
              <span>${price * diff}</span>
            </InvoiceBox>
            <InvoiceBox>
              <span>Cleaning Fee:</span>
              <span>${cleaning_fee}</span>
            </InvoiceBox>
            {extra_guests && (
              <InvoiceBox data-testid='extra-guests'>
                <span>
                  {extra_guests} Extra Guests x ${extra_fee}
                </span>
                <span>{extra_fee * extra_guests}</span>
              </InvoiceBox>
            )}
            <div data-testid='total-amount'>Total: ${total}</div>
          </Invoice>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
