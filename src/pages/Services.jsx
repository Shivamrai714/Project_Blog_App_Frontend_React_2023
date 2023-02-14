import userContext from "../context/userContext"
import Base from "../components/Base"
import { Card, CardBody, CardHeader, Col, Container, List, Row } from "reactstrap";

const Services = () => {
    return (
        <userContext.Consumer>
            {
                (object) => (

                    <Base>
                    <Container>
                      <Row className="mt-5">
                        <Col md={{size:12 , offset:0, }}>
                        
                        <Card  >
                       <CardHeader className="text-center">
                        <h1>Our Services : </h1>
                        </CardHeader>
                        
                     <CardBody>
                      {console.log(object)}
                      <h1>Welcome user: {object.user.login && object.user.data.name}</h1>
                      
                       <div>     
                      <p> * We provide various services in our website domain. </p>
                      </div>
            
                      <div className="mt-5">
                     <h4>
                      We don't charge any type of fees for this website usage. 

                      </h4>
            <div>-------------------------------------------------------------------------------------------------------------------------------------</div>
            <h2> Description : </h2>
               <span className="mt-3"></span>
           <h4> How do I write an attractive blog post?

           </h4>

<strong> 
Services for 9 Tips for Making Your Writing More... <br/>
1) Tell a story. ...  <br/>
2) Write in the first person. ...<br/>
3) Foreshadow. ...<br/>
4) Transition. ...<br/>
6) Be really, really clear. ...<br/>
7) Don't be longer than you need to be. ...<br/>
8) Don't be shorter than you should. ...<br/>
9) Write short sentences.<br/>

</strong>

</div>
            
                      </CardBody>
            
            
                        </Card>
            
                        </Col>
                      </Row>
                      </Container>   
                  
                    </Base>
            
                )
            }
        </userContext.Consumer>
    )
}

export default Services