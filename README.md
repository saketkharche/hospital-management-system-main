# Hospital Management System

## Project Overview
**Hospital Management System** is a comprehensive application developed to efficiently manage hospital operations, including patient appointments, staff assignments, medical records, and administrative tasks. The system offers distinct roles for **Patients**, **Doctors**, **Nurses/Staff**, and **Admin**, ensuring a streamlined workflow for each user group. The application is built using **Java (Spring Boot)** for the backend and **React.js** for the frontend, with a focus on scalability, security, and user-friendly design.

---

## Project Roadmap

1. **Define Project Requirements**
   - Clearly outline features and functionalities for each user role to ensure a structured development approach.

### User Modules

- **Patient (External User)**:
  - Registration and Login with secure authentication.
  - Browse doctor profiles by department.
  - Book appointments with options to choose date, time, and doctor.
  - View appointment history and check appointment status.
  - Receive notifications and reminders for upcoming appointments.

- **Admin (Internal User)**:
  - Manage profiles for doctors, nurses, and other staff.
  - Organize departments (e.g., Cardiology, Neurology).
  - Oversee and manage appointment bookings and scheduling.
  - Generate reports (e.g., patient history, financial summaries, and appointment trends).

- **Doctor**:
  - Access personal schedule and upcoming appointments.
  - Manage patient records for diagnoses and treatment.
  - Prescribe medicines and generate prescriptions.
  - Update patient statuses (admitted, discharged, etc.).

- **Nurse/Staff**:
  - View details of assigned patients.
  - Update patient vitals (e.g., blood pressure, temperature).
  - Assist doctors in patient care and record maintenance.

---

## Technology Stack

### Backend
- **Java** with **Spring Boot**
- **MySQL** or **PostgreSQL** for database management
- **REST APIs** for frontend-backend communication
- **Hibernate/JPA** for ORM

### Frontend
- **React.js** with **React Router** for navigation
- **Axios** for API requests
- **Material-UI** or **Bootstrap** for a modern, responsive UI

### Tools and Deployment
- **Git** for version control, **GitHub** for repository hosting
- **Postman** for API testing
- **Maven**/ **Gradle** for project management
- **Docker** for containerization
- **AWS** or **Heroku** for cloud deployment

---

## System Architecture

- **Architecture**: Microservices or Monolithic (based on project needs)
- **Pattern**: MVC (Model-View-Controller)
- **Authentication**: JWT (JSON Web Tokens) for secure endpoint access
- **Database Schema**: Carefully planned tables and relationships (ER Diagram included)

---

## Database Design

### Sample Database Schema

- **Users Table**: Contains general user information such as `user_id`, `name`, `email`, `password`, `role` (e.g., patient, doctor, admin, nurse), `contact_number`.
- **Patients Table**: Stores patient-specific details like `patient_id`, `user_id`, `address`, `age`, `gender`, `medical_history`.
- **Doctors Table**: Holds doctor information such as `doctor_id`, `user_id`, `specialization`, `department_id`, `availability`.
- **Appointments Table**: Tracks appointment details with `appointment_id`, `patient_id`, `doctor_id`, `appointment_date`, `status`.
- **Departments Table**: Contains department data including `department_id`, `name`, and `description`.
- **Prescriptions Table**: Manages prescription information with fields like `prescription_id`, `doctor_id`, `patient_id`, `medicine_details`.
- **Staff Table**: Includes `staff_id`, `user_id`, `role`, `assigned_department` for managing nurse/staff assignments.

---

## Backend Development

- **Project Setup**:
  - Initialize with **Spring Boot** using dependencies like:
    - **Spring Web**
    - **Spring Data JPA**
    - **MySQL Driver**
    - **Spring Security**
    - **Spring Boot DevTools**

### API Endpoints (Sample)

- **Patient APIs**:
  - `/register` - Register a new patient.
  - `/login` - Patient login with JWT authentication.
  - `/book-appointment` - Book an appointment.
  - `/view-appointments` - View appointment history.

- **Admin APIs**:
  - `/manage-doctors` - Add or update doctor profiles.
  - `/manage-departments` - Manage hospital departments.
  - `/generate-reports` - Generate reports on patient, financial, and appointment trends.

- **Doctor APIs**:
  - `/view-schedule` - Access doctor's schedule.
  - `/add-diagnosis` - Add patient diagnosis and prescribe medications.
  - `/update-patient-status` - Update status of patient.

- **Nurse/Staff APIs**:
  - `/view-assigned-patients` - View details of assigned patients.
  - `/update-vitals` - Update patient vitals.

---

## Advanced Features

- **Role-Based Access Control**: Additional security by restricting data access based on user roles.
- **Mobile-Friendly Design**: Plan for a mobile-responsive interface to improve accessibility on various devices.
- **Enhanced Notification System**: Planned email and SMS notifications to update patients on appointment confirmations and reminders.
- **Data Analytics Dashboard**: Advanced reporting on complaint trends, patient satisfaction, and performance metrics.
- **Real-Time Chat**: Integrated messaging for real-time communication between patients and hospital staff.
- **Appointment Tracking**: A feature that provides real-time updates on appointment status, similar to order tracking.

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ravikumarxworkz/hospital-management-system.git
   ```

2. **Database Setup**:
   - Import the SQL script to initialize the MySQL/PostgreSQL database.
   - Configure the `dbconfig.properties` file with your database connection details.

3. **Build and Deploy**:
   - Use Maven to build the project.
   - Deploy the application on a Tomcat server, accessible at `http://localhost:8080/hospital-management-system`.

4. **Run Frontend**:
   - Navigate to the React project folder and start the app:
   ```bash
   npm install
   npm start
   ```

---

## Future Enhancements

- **Telemedicine Integration**: Video consultation feature for virtual appointments.
- **Role-Based Data Analytics**: Customized analytics dashboards for admin and department heads.
- **Enhanced Role-Based Notifications**: Automated reminders and alerts for patients, doctors, and staff.
- **Third-Party Integration**: Integration with healthcare platforms for data interoperability.

---

## GitHub Project Link
- [GitHub Repository for Hospital Management System](https://github.com/ravikumarxworkz/hospital-management-system)

## Contributing
We welcome contributions! Please see our `CONTRIBUTING.md` file for guidelines on how to contribute to this project.

## License
This project is licensed under the **MIT License**. Please refer to the `LICENSE` file for more information.
