import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


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
const RenderComments = ({ comments }) => {
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
            </div>
        )
    } else {
        return (
            <div></div>
        )

    }

}

const DishDetail = (props) => {
    if (props.dish !== undefined) {
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
                        <RenderComments comments={props?.comments} />
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


export default DishDetail