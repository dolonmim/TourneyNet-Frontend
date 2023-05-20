import Navbar from '../Navbar/Navbar';
import './ContactUs.css'
function ContactUs(){
    return(
        <>
    <Navbar/>
    <div class="container text-center">
      <div class="row">
      </div>
      <div class="row">
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h3>Contact Information</h3>
          <br />
          <h4>
            Fill up the form and our Team will get back to you within 24 hours.
          </h4>
          <br />
          <p>01793515517</p>
          <p>erfanali@gmail.com</p>
          <p>Dhaka,Bangladesh</p>
        </div>
        <div class="col-md-8">
          <form class="row g-3">
            <div class="col-md-6">
              <label for="firstname" class="form-label">First Name</label>
              <input type="text" class="form-control" id="firstname" />
            </div>
            <div class="col-md-6">
              <label for="lastname" class="form-label">Last Name</label>
              <input type="text" class="form-control" id="lastname" />
            </div>
            <div class="col-md-6">
              <label for="inputEmail" class="form-label">Email</label>
              <input type="email" class="form-control" id="inputEmail" />
            </div>
            <div class="col-md-6">
              <label for="phonenumber" class="form-label">Phone Number</label>
              <input type="number" class="form-control" id="phonenumber" />
            </div>
            <div class="col-md-12">
              <textarea
                name="career[message]"
                class="form-control"
                tabindex="4"
                placeholder="Write your details"
                required
              ></textarea>
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-primary">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
        </>
        
    )
}
export default ContactUs;