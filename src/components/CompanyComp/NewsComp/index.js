import React from 'react';
import styled from 'styled-components';
import {
    SectionContainer,
    SectionHeader
} from "../styled";

const
    NewsContainerAnchor = styled.a`
        padding: 0 1em;
        :hover {
            background-color: rgba(4,57,94, 0.1);
            cursor: pointer;
        }
    `,
    NewsHeader = styled.h5`
        text-align: center;
        margin: 1em 0;
    `,
    NewsPubDate = styled.div`
        font-family: "Avenir Next", Verdana, sans-serif;
        font-style: italic;
        text-align: right;
    `,
    NewsSummary = styled.p`
        font-family: "Avenir Next", Verdana, sans-serif;
        margin: 1em 0;
        text-indent: 2em;
    `
;

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
        <SectionContainer>
            <SectionHeader>Related News</SectionHeader>
            { company.news.map( news => (
                    <NewsContainerAnchor href={ news.url } key={ news.id }>
                        <NewsHeader>{ news.title }</NewsHeader>
                        <NewsPubDate>{ formatDate( news.publication_date )}</NewsPubDate>
                        <NewsSummary>{ news.summary }</NewsSummary>
                    </NewsContainerAnchor>
                )
            )}
        </SectionContainer>
    )
};

export default NewsComp;