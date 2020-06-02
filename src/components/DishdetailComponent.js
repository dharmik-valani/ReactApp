// Container COMPONENT (Construct only for view  )
import React,{Component} from 'react';
import { Card, CardImg, CardText,  Modal, ModalHeader, ModalBody, Row, Col,Label,Button,
    CardBody,CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
// import CommentForm from './CommentFormComponent';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


    //here incoming is props object so declare inside bracket
   function RenderDish({dish})
    {
        return(
        <div  className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" top src={dish.image} alt={dish.name} />
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>   
            </Card> 
        </div> 
        );
    }

   function RenderComments({selectedcomment})
    {
        const rencomment = selectedcomment.map((c) => 
            <li>
             <p>{c.comment}</p>
             <p>-- {c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</p>
           </li>     
        );

        if(selectedcomment != null)
          return (
                <div  className="col-12 col-md-5 m-1">
                <h4>Comments:</h4>
                <ul className="list-unstyled">
                {rencomment}
                </ul>
                <CommentForm/>
                </div>
            );
        else
            return(
                <div></div>
            );
    }


 const Dishdetail=(props)=>{

    if (props.dish != null)
        return( 
            <div className = "container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                
                <div className = "row">
                    {/* Display the list of dishes */}
                    <RenderDish dish={props.dish}/>
                    {/* Display the selcted dish and comment  */}
                    <RenderComments selectedcomment={props.comments}/>

                </div>
            </div>
        );
    else
        return(
            <div></div>
        );
 }

 //commentform class start here 

 class CommentForm extends Component{

    constructor(props) {
        super(props);
    
      
        this.state = {
          isNavOpen: false,
          isModalOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }
      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

      handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        
    }
  

     render(){

        return(
            <div>
                <Button  outline onClick={this.toggleModal} color="secondary"><span className="fa fa-edit fa-lg"></span>Submit Comment</Button>{' '}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>

                        {/* Form start here  */}
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                
                                <Col>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                        className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </Control.select>
                                </Col>
                                
                            </Row>
                            <Row className="form-group">
                                
                                <Col>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                            <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                     
                                </Col>
                                 
                            </Row>
                            <Row className="form-group">
                            <Col>
                                <Label for="comment">Comment</Label>
                                
                                <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                                
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                      Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                        
                    </ModalBody>
                </Modal>
            </div>
        );
     }


}
export default Dishdetail;



