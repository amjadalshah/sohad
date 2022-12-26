var submitBtn = document.getElementById("submit-btn");
var table = document.getElementById("table");
var students = [];
var id = 1;

// validate function
function validate() {
    var arabic = /[\u0600-\u06FF]/;
    if (document.forms["addForm"]["userName"].value == "" || document.forms["addForm"]["userName"].value.indexOf('_') == -1) {
        document.getElementById("userNameError").innerHTML = " هذا الحقل مطلوب او القيمة المدخلة غير صحيحة";
        return false;
    }
    if (document.forms["addForm"]["name"].value == "" || !arabic.test(document.forms["addForm"]["name"].value)) {
        document.getElementById("nameError").innerHTML = "هذا الحقل مطلوب ويجب أن يكون باللغة العربية";
        return false;
    }
    if (document.forms["addForm"]["birthdayDate"].value == "") {
        document.getElementById("birthdayDateError").innerHTML = "هذا الحقل مطلوب";
        return false;
    }
    if (document.forms["addForm"]["program"].value == "") {
        document.getElementById("programError").innerHTML = "هذا الحقل مطلوب";
        return false;
    }
    if (document.forms["addForm"]["phone"].value == "") {
        document.getElementById("phoneError").innerHTML = "هذا الحقل مطلوب";
        return false;
    }
    if (!document.forms["addForm"]["phone"].value.startsWith("96399") &&
        !document.forms["addForm"]["phone"].value.startsWith("96393") &&
        !document.forms["addForm"]["phone"].value.startsWith("96395") &&
        !document.forms["addForm"]["phone"].value.startsWith("96394") &&
        !document.forms["addForm"]["phone"].value.startsWith("96396") &&
        !document.forms["addForm"]["phone"].value.startsWith("96398") &&
        !document.forms["addForm"]["phone"].value.startsWith("963") &&
        document.forms["addForm"]["phone"].value.length - 3 > 7) {
        document.getElementById("phoneError").innerHTML = "يجب أن يتكون الرقم من 7 خانات فقط أو صيغة غير صالحة";
        return false;
    }

    if (document.forms["addForm"]["captcha"].value != document.getElementById("captchaCode").innerHTML) {
        document.getElementById("captchaError").innerHTML = "الكود غير صحيح";
        return false;
    }
    return true;
}

// add student function
function addStudent() {
    if (validate()) {
        newRow = table.insertRow(table.length),
            cell1 = newRow.insertCell(0),
            cell2 = newRow.insertCell(1),
            cell3 = newRow.insertCell(2),
            cell4 = newRow.insertCell(3);
        students.push({
            "id": id++,
            "userName": document.forms["addForm"]["userName"].value,
            "name": document.forms["addForm"]["name"].value,
            "birthdayDate": document.forms["addForm"]["birthdayDate"].value,
            "phone": document.forms["addForm"]["phone"].value,
            "program": document.forms["addForm"]["program"].value
        });
        students.sort((a, b) => a.value - b.value).forEach(student => {
            cell1.innerHTML = student.id;
            cell2.innerHTML = student.userName;
            cell3.innerHTML = student.name;
            cell4.innerHTML = student.program;
        })
        students.sort((a, b) => {
            const nameA = a.userName.replace(/\D/g, '');
            const nameB = b.userName.replace(/\D/g, '');
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        document.getElementById("userNameError").innerHTML = ""
        document.getElementById("nameError").innerHTML = ""
        document.getElementById("birthdayDateError").innerHTML = ""
        document.getElementById("programError").innerHTML = ""
        document.getElementById("phoneError").innerHTML = ""
        document.getElementById("captchaError").innerHTML = ""
        document.getElementById("captchaCode").innerHTML = ""
        generateCode()
    }
}

function getStudentsByProgram() {
    let studentsFiltered = [];
    for (var i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    students.forEach(student => {
        if (document.forms["getStudentByProgramForm"]["program"].value != "all") {
            if (student.program == document.forms["getStudentByProgramForm"]["program"].value) {
                studentsFiltered.push({
                    "id": student.id,
                    "userName": student.userName,
                    "name": student.name,
                    "birthdayDate": student.birthdayDate,
                    "phone": student.phone,
                    "program": student.program
                });
                newRow = table.insertRow(table.length),
                    cell1 = newRow.insertCell(0),
                    cell2 = newRow.insertCell(1),
                    cell3 = newRow.insertCell(2),
                    cell4 = newRow.insertCell(3);
                cell1.innerHTML = student.id;
                cell2.innerHTML = student.userName;
                cell3.innerHTML = student.name;
                cell4.innerHTML = student.program;
            } else {
                console.log("no students");
            }
        } else {
            students.push({
                "id": student.id,
                "userName": student.userName,
                "name": student.name,
                "birthdayDate": student.birthdayDate,
                "phone": student.phone,
                "program": student.program
            });
            newRow = table.insertRow(table.length),
                cell1 = newRow.insertCell(0),
                cell2 = newRow.insertCell(1),
                cell3 = newRow.insertCell(2),
                cell4 = newRow.insertCell(3);
            cell1.innerHTML = student.id;
            cell2.innerHTML = student.userName;
            cell3.innerHTML = student.name;
            cell4.innerHTML = student.program;
        }
    })
}

function getStudentsByFilter() {
    for (var i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    document.filterForm.onclick = function () {
        var filterVal = document.querySelector('input[name = filter]:checked').value;
        students.sort((a, b) => {
            if (filterVal == 'program') {
                const nameA = a.program;
                const nameB = b.program;
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            } else if (filterVal == 'userName') {
                const nameA = a.userName;
                const nameB = b.userName;
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            } else {
                const nameA = a.id;
                const nameB = b.id;
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            }
            return 0;
        });
    }
    students.sort((a, b) => a.value - b.value).forEach(student => {
        newRow = table.insertRow(table.length),
            cell1 = newRow.insertCell(0),
            cell2 = newRow.insertCell(1),
            cell3 = newRow.insertCell(2),
            cell4 = newRow.insertCell(3);
        cell1.innerHTML = student.id;
        cell2.innerHTML = student.userName;
        cell3.innerHTML = student.name;
        cell4.innerHTML = student.program;
    });
}

// generate captcha code
function generateCode() {
    document.getElementById("jsonData").value = ""
    const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 1; i < 6; i++) {
        document.getElementById("captchaCode").innerHTML += randomchar.charAt(
            Math.random() * randomchar.length)
    }
}

// convert to json
function toJson() {
    document.getElementById("jsonData").value = JSON.stringify(students)
}