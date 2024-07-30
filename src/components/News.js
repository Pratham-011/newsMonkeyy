import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    // static propTypes = {
    //     country: PropTypes.string,
    //     pageSize: PropTypes.number,
    //     category: PropTypes.string,

    // }

    // static defautProps = {
    //     country: "in",
    //     pageSize: 8,
    //     category: 'general',
    
    // }

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
   const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    
 const updateNews =  async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=10581b6b0d4a47b1828716002c7c7c92&page=${page}&pageSize=${ props.pageSize}`
        // this.setState({ loading: true });
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }
    useEffect(() => {
        
        document.title = `${capitalizeFirstLetter( props.category)} - NewsMonkey`;
        updateNews();
        //eslint-disable-next-line
    }, [])
    
    // async componentDidMount() {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=10581b6b0d4a47b1828716002c7c7c92&page=1&pageSize=${ props.pageSize}`
    //     // this.setState({loading:true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json()
    //     // this.setState({ articles: parsedData.articles,totalResults: parsedData.totalResults ,loading:false})
    //     this.updateNews();

    // }
//    const handlePreviousCLick = async () => {
//         // let url = `https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=10581b6b0d4a47b1828716002c7c7c92&page=${this.state.page - 1}&pageSize=${ props.pageSize}`;
//         // this.setState({loading:true});
//         // let data = await fetch(url);
//         // let parsedData = await data.json()
//         // this.setState({
//         //     page: this.state.page - 1,
//         //     articles: parsedData.articles,
//         //     loading:false
//         // })
//         // this.setState({ page: this.state.page - 1 });
//         setPage(page-1)
//         updateNews();
//     }
//    const handleNextCLick = async () => {
//         //     if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/ props.pageSize)) ){
//         //     let url = `https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=10581b6b0d4a47b1828716002c7c7c92&page=${this.state.page + 1}&pageSize=${ props.pageSize}`;
//         //     this.setState({loading:true});
//         //     let data = await fetch(url);
//         //     let parsedData = await data.json()
//         //     this.setState({
//         //         page: this.state.page + 1,
//         //         articles: parsedData.articles,
//         //         loading:false
//         //     })
//         // }
//         // this.setState({ page: this.state.page + 1 });
//         setPage(page+1)
//         updateNews();
//     }

 const  fetchMoreData = async () => {
    //    this.setState({page: this.state.page+1})
    
 
       const url = `https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=10581b6b0d4a47b1828716002c7c7c92&page=${page+1}&pageSize=${ props.pageSize}`;
    //    this.setState({ loading: true });
    setPage(page+1)
       let data = await fetch(url);
       let parsedData = await data.json()
       setArticles(articles.concat(parsedData.articles))
       setTotalResults(parsedData.totalResults)
    //    this.setState({ articles: articles.concat(parsedData.articles), totalResults: parsedData.totalResults ,

    // })

    };

    
        return (
           <>
                <h1 className='text-center' style={{marginTop:'90px'}}>NewsMonkey - TopHeadlines On {capitalizeFirstLetter( props.category)} Category</h1>
               {loading && <Spinner/>}
                <InfiniteScroll 
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                    // endMessage={
                    //     <p style={{ textAlign: 'center' }}>
                    //       <b>Yay! You have seen it all</b>
                    //     </p>
                    // }
                    >
               
                    <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 20) : ""} description={element.description ? element.description.slice(0, 40) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}

                    </div>
                   
                    </div>
                    </InfiniteScroll>
                    
              
                {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled = {this.state.page <= 1} className="btn btn-dark" onClick={this.handlePreviousCLick}>&larr; Previous</button>
                    <button type="button" disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/ props.pageSize)} className="btn btn-dark" onClick={this.handleNextCLick}>Next &rarr;</button>
                </div> */}
                

                </>

            
        )
    
}


News.defautPropspropTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

}

News.defautProps = {
    country: "in",
    pageSize: 8,
    category: 'general',

}
export default News;
