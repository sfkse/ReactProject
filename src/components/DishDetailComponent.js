/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const minLength = (len) => (val) => val && (val.length >= len)
const maxLength = (len) => (val) => !val || (val.length <= len)

const RenderDish = ({ dish }) => {

    return (
        <Card >
            <CardImg width="100%" src={dish?.image} alt={dish?.name} />
            <CardBody>
                <CardTitle>{dish?.name}</CardTitle>
                <CardText>{dish?.description}</CardText>
            </CardBody>
        </Card>
    )

}
const RenderComments = ({ comments, addComment, dishId }) => {
    if (comments) {
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((com) => {
                        const commentTime = new Date(com.date);
                        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];
                        return (
                            <>
                                <li className="mb-3">
                                    {com.comment}
                                </li>
                                <li className="mb-3">
                                    --  {com.author},{` ${monthNames[commentTime.getMonth()].slice(0, 3)} ${commentTime.getDate()}, ${commentTime.getFullYear()}`}
                                </li>
                            </>
                        )
                    })}
                </ul>
                <CommentFrom dishId={dishId} addComment={addComment} />
            </div>
        )
    } else {
        return (
            <div></div>
        )

    }

}

const DishDetail = (props) => {

    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.dish !== null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props?.dish?.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props?.dish?.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 col-xs-12 col-sm-12 m-1" >
                        <RenderDish dish={props?.dish} />
                    </div>
                    <div className="col-md-5 col-xs-12 col-sm-12  m-1">
                        <RenderComments
                            addComment={props.addComment}
                            dishId={props.dish.id}
                            comments={props?.comments} />
                    </div>
                </div>
            </div>

        )
    } else {
        return (
            <div></div>
        )
    }

}

class CommentFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    handleSubmit(values) {
        this.toggleModal();
        alert(JSON.stringify(values))
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)

    }
    render() {
        return (
            <>
                <Button outline type="submit" value="submit" color="secondary" onClick={this.toggleModal}><span className="fa fa-pencil"></span>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" id="rating"
                                        className="form-control">
                                        <option>Select a rating</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        className="form-control"
                                        placeholder="Your Name"
                                        validators={{
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                </Col>
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength: "Must be greater than 3 characters long",
                                        maxLength: "Must be less than 15 characters long"
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control">
                                    </Control.textarea>
                                </Col>
                            </Row>
                            <Button color="primary"  >Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </>
        )
    }

}


export default DishDetail