import {Card, CardBody, CardImg, CardText, CardTitle, Spinner} from "reactstrap";
import React, {Component} from "react";
import InfiniteScroll from "react-infinite-scroll-component";

class Home extends Component {
    state = {
        items: Array.from({length: 5})
    };

    fetchMoreData = () => {
        setTimeout(() => {
            this.setState({
                items: this.state.items.concat(Array.from({length: 5}))
            });
        }, 1200);
    };

    render() {
        return (
            <div>
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<h4><Spinner color="dark"/>Loading...</h4>}
                >
                    {this.state.items.map((e, index) => (
                        <div className="pb-5" key={index}>
                            <Card className="shadow">
                                <CardImg top width="100%"
                                         src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                                         alt="Card image cap"/>
                                <CardBody>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to
                                        additional
                                        content. This content is a little bit longer.</CardText>
                                    <CardText>
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
}

export default Home;