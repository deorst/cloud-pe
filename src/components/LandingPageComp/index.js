import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

import { API_KEY } from "../../CONFIG";


const cardStructure = {
    name: 'Title',
    open: 'Open',
    close: 'Close',
    high: 'High'
};

class LandingPageComp extends React.Component {

    state = {};

    componentDidMount() {

        // Pull 10 random companies, to get their names and tickers.
        fetch( `https://api-v2.intrinio.com/securities?page_size=10&api_key=${ API_KEY }` )
            .then( res => res.json() )
            .then( data => {
                this.setState( prevState => {
                    data.securities.forEach(({ name, ticker }) => {
                        prevState[ ticker ] = { name };
                    });
                    return prevState;
                })
            })
            .then(() => {

                // The day before yesterday - to make sure the data exist.
                reqDate.setDate( reqDate.getDate() - 2 );
                reqDate = reqDate.toISOString().split( 'T' )[ 0 ];

                Object.keys( this.state ).forEach( ticker => {
                    fetch( `https://api-v2.intrinio.com/securities/${ ticker }/prices?start_date=${ reqDate }&api_key=${ API_KEY }` )
                        .then( res => res.json() )
                        .then( data => {
                            console.log( 'DATA', data );
                            if ( data.error === undefined && data.stock_prices.length > 0 ) {
                                this.setState( prevState => {
                                    const { open, close, high } = data.stock_prices[ 0 ];
                                    prevState[ ticker ].open = open;
                                    prevState[ ticker ].close = close;
                                    prevState[ ticker ].high = high;
                                    return prevState;
                                });
                            } else console.error( ticker, data.error )

                        })
                        .catch( err => console.error( err ) )
                } );
            })
            .catch( err => console.error( err ) );

        let reqDate = new Date();

    }

    render() {
        return (
            <div className={ styles.container }>
                <div className={ styles.cardRow }>
                    { Object.keys( this.state ).map( ticker => (
                        <Link to={ `/companies/${ ticker }` } key={ ticker } className={ styles.card }>
                            { Object.keys( cardStructure ).map( key => (
                                <div key={ key } className={ styles.propLine }>
                                    <div className={ styles.propKey }>
                                        { cardStructure[ key ] }:
                                    </div>
                                    <div className={ styles.propValue }>{ this.state[ ticker ][ key ] || 'Not available' }</div>
                                </div>
                            ) ) }
                        </Link>
                    ) ) }
                </div>
            </div>
        )
    }
}

export default LandingPageComp;

