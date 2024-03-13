# KDN Classroom

Classroom Management Tools & Resources

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)

## About

Final project

Advanced Web Programming

### Tech Stack
- Front-end: Reactjs, Material UI, react-router, react-hook-form
- Back-end: Nestjs, Postgres, Cloudinary, Passportjs

## Deployment

Front-end: https://kdn-classroom.netlify.app/

Back-end: https://web-advanced-server-v2.onrender.com

## Demo Video

GA02: Youtube: https://youtu.be/poKaQUmJOx8

GA01: Youtube: https://youtu.be/GIjBgv-85Ls

Midterm: Youtube: https://youtu.be/Db7cxGFMyI8

## Installation

```
git clone https://github.com/Dat-TG/AdvancedWebFinalProject.git
```

## Usage

```
npm install
npm run dev
```

Then create a `.env.local` file with these variables:

```
VITE_REACT_APP_BASE_URL=https://web-advanced-server-v2.onrender.com/api
VITE_REACT_APP_PORT=5173
VITE_REACT_APP_GOOGLE_CLIENT_ID=405078031478-2ijmsuolss017s9egteko00bhro73lpc.apps.googleusercontent.com
VITE_REACT_APP_FACEBOOK_APP_ID=1143865149911728
```

Then goto http://localhost:5173/

## Features

### User Navigation
- Users can navigate between all pages.

### React UI Framework
- Utilizes a React UI Framework for the project's user interface, ensuring a responsive and modern design.

### Authentication Flow
- Sign Up
- Sign In with email and password
- Sign In with Google
- Sign In with Facebook
- Account activation by email
- Verify access token
- Refresh token
- Sign out
- Managing sign-in and sign-out UI states for users
- Restrict feature access based on the user’s role
- Use a popular authentication library

### User Profile Management
Users can edit:
- Profile information: firstname, lastname
- Change password
- Forgot password
- Reset password by email
- Upload avatar
- Edit avatar: crop, rotate, zoom in, zoom out

### Teacher

#### Class management
- Create class
- List classes
- Show class details
- Show list of teachers and students in class

#### Class invitation
- Create a class invitation link and join class by link
- Invite student by email
- Invite teacher by email

#### Grade structure
- Interactive UI to manage grade structure (like Google Form)
- Show current grade structure
- Add a grade composition with a name and grade scale
- Remove a grade composition
- Update a grade composition (name, grade scale)
- Arrange a grade composition position

#### Grade management
- Download default csv/Excel (xlsx) template for student list (StudentId, FullName)
- Class owner uploads a csv/xlsx file with student list (StudentId, Full name): Update new student to current grade board
- Show Students (pre-upload full student list) x Grades board
- Map Student Id with Student account in grade board
- Input grade for a student at a specific assignment: or multiple assignments
- Download default csv/Excel (xlsx) template for grades for an assignment (StudentId, Grade): or multiple assignments
- Teacher uploads a csv/xlsx file for grades of all students for a specific assignment: or multiple assignment
- Show total grade column at grade board: auto calculate
- Export Grade board to a csv/xlsx file
- Mark a grade composition as finalized

### Student

#### Join class
- By code
- By invitation link

#### Profile

- Manage profile: change information, avatar, student ID
- Student ID and account mapping

#### Class information
- List joined classes
- View Grade structure
- View class members: teachers, students
  
#### Grade viewer
- View his grade compositions, overall grade
- Request a review of each grade composition
- View and comment on grade review between the teacher and themself

### Notification

#### Students receive a notification when:
- When a teacher finalizes a grade composition, create notifications to all students in the class
- When a teacher replies to a student grade review
- When a teacher creates a final decision on a mark review

#### Teachers receive a notification when:
- The student requests a grade review
- When a student replies to a teacher grade review

#### Navigate to the coresponding location when click on a notification

### Admin page

- Authentication
- Manage user accounts
- Lock/ban an account
- Student ID and account mapping
- Manually map or unmap the StudentId of an account
- Map a list of student Ids by uploading Excel file
- Manage classes
- View, sort, filter classes
- Inactive/active a class

### Bonus

- Globalization localization i18n
- Course theme and background
- Table data interactive, friendly, easy use, auto calculation







### Public Hosting
- Includes functionality to upload projects to a public host, facilitating easy sharing and accessibility.

## Contributing

Evaluation Document: https://drive.google.com/file/d/1COMGZzpJelZ_T7zwBXaw70zbE2L9i8nI/view?usp=sharing

This project was created and is actively maintained by:

- [19120260 Hoàng Trần Thiên Khôi](https://github.com/thienkhoi0604/)
- [20120454 Lê Công Đắt](https://github.com/dat-tg)
- [20120537 Hồ Trung Nguyên](https://github.com/hotrungnguyen76)
