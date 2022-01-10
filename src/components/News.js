import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
 import Spinner from"./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>  {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [ totalResults, setTotalRestults] = useState(0)
 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
 

  
  const updateNews = async() => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6d0ba4b486fc4621a30df6c120810ec9&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalRestults(parsedData.totalResults)
    setLoading(false)
    
    props.setProgress(100);
  };
 useEffect(() => {
  updateNews()
  document.title = `${capitalizeFirstLetter(props.category)}-News App`;
},[])
//   const handlePrevious = async () => {
// setPage(page-1)
//     updateNews();
//   };
//  const handleNext = async () => {
//   setPage(page+1)
//     updateNews();
//   };
 const fetchMoreData = async () => {
 
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
setArticles(articles.concat(parsedData.articles))
setTotalRestults(parsedData.totalResults)
   
  };

    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px ",marginTop:"90px" }}>
       
            Top {capitalizeFirstLetter(props.category)} Headline
        
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((elements) => {
                return (
                  <div className="col-md-4 " key={elements.url}>
                    <NewsItem title={elements.title ? elements.title : ""}
                      description={
                        elements.description ? elements.description : ""
                      }
                      imageUrl={
                        elements.urlToImage
                          ? elements.urlToImage
                          : "https://media.gettyimages.com/vectors/live-breaking-news-headline-with-blue-and-red-color-background-vector-id1221950506?s=612x612"
                      }
                      newsUrl={elements.url}
                      author={elements.author ? elements.author : "Unknown"}
                      date={elements.publishedAt}
                      source={elements.source.name}
                    />
                  </div>
                );
              })}
            </div>
            
          </div>
        </InfiniteScroll>
      </>
    );

}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
