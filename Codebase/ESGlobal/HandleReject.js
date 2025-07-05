function handleReject(teacherBundle, studentBundle, reason) {
  //destination teacher curr students --;
  accessTeacherDB().changeCurrentStudent(teacherBundle.destinationTeacher, -1);

  //remove student from student db
  accessStudentDB().setData(studentBundle.email, {
    email: "",
    name: "",
    homeroom: "",
    destination: "",
    purpose: "",
    status: "",
  });

  //send email to student
  sendRejectEmail(
    studentBundle.email,
    studentBundle.name,
    studentBundle.destination,
    reason
  );
  //handleSubmitted auto removes student from homeroom teacher
  //only acceptances will be added to homeroom teacher
}
