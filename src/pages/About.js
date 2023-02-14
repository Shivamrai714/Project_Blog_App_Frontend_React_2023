import userContext from "../context/userContext";
import Base from "../components/Base";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

//Here we have implemtned the concept of the Context Api in react. 
//That we have created a folder context in src where have declared the context variable and passed the user from there. And then we have created the Provider component for that . Now this data is widely acceptable and can be used like below .

const About = () => {
  return (
    <userContext.Consumer>
      {(object) => (
       <Base>
        <Container>
          <Row className="mt-5">
            <Col md={{size:12 , offset:0, }}>
            
            <Card  >
           <CardHeader className="text-center">
            <h1>About Us : </h1>
            </CardHeader>
            
         <CardBody>
          {console.log(object)}
          <h1>Welcome user: {object.user.login && object.user.data.name}</h1>
          
           <div>     
          <p>We are building blog website</p>
          </div>

          <div className="mt-5">
         <h4>
           About page that can inspire people to work with you or buy your products. It can contain  your brand story, your achievements, and your best testimonials.
          </h4>
<div>-------------------------------------------------------------------------------------------------------------------------------------</div>
<h3> Description : </h3>
An About page is not a place to push a hard sell or boast about your business. It should offer an up-front and honest portrayal of your company, its story, and your values.

So when creating an About Us page, you should make sure to:
<br/>
Stay away from the hype. Users can see straight through it, so leave it for social media.<br/>
Avoid a sales pitch. If a reader is on your About Us page, there’s a good chance they’re considering using your service or buying your product.<br/> They’re looking at why they should choose you. So don’t sell your product or service. Sell you.
Be creative.<br/>
<br/>   Don’t fall into the trap of simply writing a brief summary of your business and calling it a day. The best About Us pages are creative, informative, and interesting.
<br/>   Don’t follow the crowd. If someone’s reading your About page, there’s a good chance they’ve been considering your competitors. So, make sure your page stands out. It should make it almost impossible for a potential customer to forget you.
Feature faces.
<br/>
 Consumers often like to know who they’re buying from or working with, so be sure to feature at least some of your team members on your About page. It can really help boost conversions.
 <br/>The bottom line is that people want to work with other people, not brands. You can use your About page to relate to users on a personal level and help them learn about your business.
          </div>

          </CardBody>


            </Card>

            </Col>
          </Row>
          </Container>   
      
        </Base>

   
      )}
    </userContext.Consumer>
  );
};

export default About;
