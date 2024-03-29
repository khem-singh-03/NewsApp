import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
   
   static defaultProps = {
      country : 'in',
      pageSize: 8,
      category: "general"
   }
   
   static  propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category : PropTypes.string,
   }

    constructor(props){
        super(props);
        console.log("Hi , this is constructor from news component");
        this.state = {
               articles : [],
               loading : false,
               page :1
    }
}
async updateNews() {
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=404d21c70ec647dc8e9fe42fdef0e92c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({ loading: true });
  let data = await fetch(url);  
  let parsedData = await data.json() 
  this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
  })

}
 async componentDidMount() {
  this.updateNews();
}
  
  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
}

handleNextClick = async () => {
  this.setState({ page: this.state.page + 1 });
  this.updateNews()
}

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'35px 0px'}} >NewsMonkey- Top Headlines</h1>
        {this.state.loading&&<Spinner/>}
        <div className="row">

        {!this.state.loading&&this.state.articles.map((element)=>{
            
            
             return <div className="col-md-4" key ={element.url} > 
              <NewsItem  title ={element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,88):""} imageUrl ={element.urlToImage?element.urlToImage:"https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?width=1198&trim=1,1&bg-color=000&pad=1,1"} 
                              newsUrl={element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name} />
        </div>
        })}
             
        </div>
        
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
            <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
         
      </div>
    )
  }
}

export default News
