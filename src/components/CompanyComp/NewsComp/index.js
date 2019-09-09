import React from 'react';
import styles from "../index.module.css";

const formatDate = date => Intl.DateTimeFormat(
    'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format( new Date( date ));

const NewsComp = props => {

    const { company } = props;
    
    if ( !company || !company.hasOwnProperty( 'news' )) return null;
    
    return (
        <div className={ styles.sectionContainer }>
            <h4 className={ styles.sectionHeader }>Related News</h4>
            { company.news.map( news => (
                    <a href={ news.url } className={ styles.newsContainer } key={ news.id }>
                        <h5 className={ styles.newsHeader }>{ news.title }</h5>
                        <div className={ styles.newsPubDate }>{ formatDate( news.publication_date )}</div>
                        <p className={ styles.newsSummary }>{ news.summary }</p>
                    </a>
                )
            )}
        </div>
    )
};

export default NewsComp;