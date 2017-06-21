import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// Youtube api key, lets me pull videos from the Youtube api
const API_KEY = 'AIzaSyCI8Pz38Lcw25GcxV04iTSMali1xvMT84E'


// Class based component for the search bar.
class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
          videos: [],
          selectedVideo: null
      };

      this.videoSearch('Sports')
  }
      videoSearch(term) {
          YTSearch({key: API_KEY, term: term}, (videos) => {
              this.setState({
                  videos: videos,
                  selectedVideo: videos[0]
              });
          });
      }

render() {
      const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

  return (
    <div>
      <SearchBar onSearchTermChange={videoSearch} />
      <VideoDetail video={this.state.selectedVideo} />
      <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
    </div>
    );
  }
}

// Takes the component's generated HTML and renders it to the DOM
ReactDOM.render(<App />, document.querySelector('.container'));
