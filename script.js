/* =====================================================
   SMARTBLOOD JAVASCRIPT
===================================================== */


/* =====================================================
   SAMPLE DONOR DATABASE
===================================================== */

const sampleDonors = [

    {
        name: "Arun Kumar",
        blood: "O+",
        district: "Dindigul",
        distance: 2.4,
        available: true
    },

    {
        name: "Priya S",
        blood: "O+",
        district: "Dindigul",
        distance: 4.1,
        available: true
    },

    {
        name: "Vijay R",
        blood: "A+",
        district: "Madurai",
        distance: 3.2,
        available: true
    },

    {
        name: "Karthik M",
        blood: "B+",
        district: "Dindigul",
        distance: 5.5,
        available: true
    },

    {
        name: "Divya P",
        blood: "AB+",
        district: "Virudhunagar",
        distance: 4.8,
        available: true
    },

    {
        name: "Rahul S",
        blood: "O-",
        district: "Theni",
        distance: 6.5,
        available: true
    },

    {
        name: "Meena R",
        blood: "A+",
        district: "Dindigul",
        distance: 2.8,
        available: true
    },

    {
        name: "Sathish K",
        blood: "B-",
        district: "Madurai",
        distance: 7.2,
        available: true
    }

];


/* =====================================================
   SCREEN CONTROL
===================================================== */

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(function(screen) {

        screen.classList.remove("active");

    });


    document
        .getElementById(screenId)
        .classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   WELCOME
===================================================== */

function showWelcome() {

    showScreen("welcomeScreen");

}


function openRegistration() {

    showScreen("registrationScreen");

}


/* =====================================================
   REGISTRATION
===================================================== */

document
    .getElementById("registrationForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                .getElementById("fullName")
                .value
                .trim();


            const age =
                document
                .getElementById("age")
                .value;


            const gender =
                document
                .getElementById("gender")
                .value;


            const height =
                document
                .getElementById("height")
                .value;


            const weight =
                document
                .getElementById("weight")
                .value;


            const phone =
                document
                .getElementById("phone")
                .value
                .trim();


            const email =
                document
                .getElementById("email")
                .value
                .trim();


            const bloodGroup =
                document
                .getElementById("bloodGroup")
                .value;


            const district =
                document
                .getElementById("district")
                .value;


            const address =
                document
                .getElementById("address")
                .value
                .trim();


            const healthIssues =
                document
                .getElementById("healthIssues")
                .value
                .trim();


            /* CONTACT VALIDATION */

            if (
                phone === "" &&
                email === ""
            ) {

                alert(
                    "Please enter either Phone Number or Email ID."
                );

                return;

            }


            /* AGE VALIDATION */

            if (
                Number(age) < 1 ||
                Number(age) > 120
            ) {

                alert(
                    "Please enter a valid age."
                );

                return;

            }


            /* PROFILE OBJECT */

            const profile = {

                name: name,

                age: age,

                gender: gender,

                height: height,

                weight: weight,

                phone: phone,

                email: email,

                bloodGroup: bloodGroup,

                district: district,

                address: address,

                healthIssues:
                    healthIssues ||
                    "Not provided",

                role: ""

            };


            /* SAVE PROFILE */

            localStorage.setItem(
                "smartBloodProfile",
                JSON.stringify(profile)
            );


            /* COPY BLOOD AND DISTRICT TO DONOR PAGE */

            document
                .getElementById("donorBlood")
                .value = bloodGroup;


            document
                .getElementById("donorDistrict")
                .value = district;


            /* OPEN ROLE SELECTION */

            showScreen("roleScreen");


            alert(
                "Registration details saved successfully!"
            );

        }
    );


/* =====================================================
   ROLE SELECTION
===================================================== */

function openRoleSelection() {

    showScreen("roleScreen");

}


/* =====================================================
   OPEN DONOR
===================================================== */

function openDonor() {

    const profile =
        getProfile();


    if (!profile) {

        alert(
            "Please complete registration first."
        );

        openRegistration();

        return;

    }


    document
        .getElementById("donorBlood")
        .value =
        profile.bloodGroup;


    document
        .getElementById("donorDistrict")
        .value =
        profile.district;


    showScreen("donorScreen");

}


/* =====================================================
   SAVE DONOR
===================================================== */

function saveDonor() {

    const availability =
        document
        .getElementById("availability")
        .value;


    const contactPreference =
        document
        .getElementById("contactPreference")
        .value;


    const profile =
        getProfile();


    if (!profile) {

        alert(
            "Profile not found. Please register again."
        );

        showWelcome();

        return;

    }


    profile.role = "Donor";

    profile.availability =
        availability;

    profile.contactPreference =
        contactPreference;


    /* SAVE UPDATED PROFILE */

    localStorage.setItem(
        "smartBloodProfile",
        JSON.stringify(profile)
    );


    /* OPEN DASHBOARD */

    updateDashboard(profile);

    showScreen("dashboardScreen");


    alert(
        "Donor registration completed successfully!"
    );

}


/* =====================================================
   OPEN PATIENT
===================================================== */

function openPatient() {

    showScreen("patientScreen");

}


/* =====================================================
   FIND POTENTIAL DONORS
===================================================== */

function findMatches() {


    const patientName =
        document
        .getElementById("patientName")
        .value
        .trim();


    const requiredBlood =
        document
        .getElementById("requiredBlood")
        .value;


    const units =
        document
        .getElementById("units")
        .value;


    const hospital =
        document
        .getElementById("hospital")
        .value
        .trim();


    const district =
        document
        .getElementById("patientDistrict")
        .value;


    const emergency =
        document
        .getElementById("emergency")
        .value;


    const contact =
        document
        .getElementById("patientContact")
        .value
        .trim();


    /* VALIDATION */

    if (
        patientName === "" ||
        requiredBlood === "" ||
        units === "" ||
        hospital === "" ||
        district === "" ||
        emergency === "" ||
        contact === ""
    ) {

        alert(
            "Please fill all patient request details."
        );

        return;

    }


    /* FILTER DONORS */

    let matches =
        sampleDonors.filter(
            function(donor) {

                return (
                    donor.blood === requiredBlood &&
                    donor.available === true
                );

            }
        );


    /* CALCULATE SCORE */

    matches =
        matches.map(
            function(donor) {

                let score = 75;


                /* SAME DISTRICT BONUS */

                if (
                    donor.district === district
                ) {

                    score += 18;

                }


                /* DISTANCE SCORE */

                if (
                    donor.distance <= 3
                ) {

                    score += 6;

                }

                else if (
                    donor.distance <= 5
                ) {

                    score += 3;

                }


                /* EMERGENCY BONUS */

                if (
                    emergency === "Critical"
                ) {

                    score += 5;

                }

                else if (
                    emergency === "Urgent"
                ) {

                    score += 3;

                }


                /* MAXIMUM */

                if (score > 99) {

                    score = 99;

                }


                return {

                    ...donor,

                    score: score

                };

            }
        );


    /* SORT BY SCORE */

    matches.sort(
        function(a, b) {

            return b.score - a.score;

        }
    );


    /* SHOW RESULTS */

    const resultBox =
        document.getElementById(
            "matchingResults"
        );


    const donorResults =
        document.getElementById(
            "donorResults"
        );


    donorResults.innerHTML = "";


    if (matches.length === 0) {

        donorResults.innerHTML = `

            <div class="no-result">

                <h3>
                    No potential donor found
                </h3>

                <p>
                    There is no available sample
                    donor for the selected blood group.
                </p>

            </div>

        `;

    }


    matches.forEach(
        function(donor) {

            const donorCard =
                document.createElement(
                    "div"
                );


            donorCard.className =
                "donor-result";


            donorCard.innerHTML = `

                <div>

                    <h3>
                        👤 ${donor.name}
                    </h3>

                    <p>
                        🩸 Blood Group:
                        <strong>
                            ${donor.blood}
                        </strong>
                    </p>

                    <p>
                        📍 District:
                        ${donor.district}
                    </p>

                    <p>
                        📏 Distance:
                        ${donor.distance} km
                    </p>

                    <p class="available">
                        ● Available
                    </p>

                </div>

                <div>

                    <div class="match-score">
                        ${donor.score}% Match
                    </div>

                    <br>

                    <button
                        class="primary-btn"
                        onclick="
                        contactDonor(
                            '${donor.name}'
                        )"
                    >
                        CONTACT
                    </button>

                </div>

            `;


            donorResults.appendChild(
                donorCard
            );

        }
    );


    resultBox.style.display =
        "block";


    resultBox.scrollIntoView({
        behavior: "smooth"
    });


    /* SAVE REQUEST */

    const request = {

        patientName:
            patientName,

        bloodGroup:
            requiredBlood,

        units:
            units,

        hospital:
            hospital,

        district:
            district,

        emergency:
            emergency,

        contact:
            contact,

        createdAt:
            new Date().toLocaleString()

    };


    localStorage.setItem(
        "lastBloodRequest",
        JSON.stringify(request)
    );

}


/* =====================================================
   CONTACT DONOR
===================================================== */

function contactDonor(name) {

    alert(

        "You selected " +
        name +
        " as a potential donor.\n\n" +

        "In the real application, " +
        "secure verified contact details " +
        "would be handled through the backend."

    );

}


/* =====================================================
   GET PROFILE
===================================================== */

function getProfile() {

    const saved =
        localStorage.getItem(
            "smartBloodProfile"
        );


    if (!saved) {

        return null;

    }


    try {

        return JSON.parse(saved);

    }

    catch (error) {

        return null;

    }

}


/* =====================================================
   UPDATE DASHBOARD
===================================================== */

function updateDashboard(profile) {

    document
        .getElementById("dashboardName")
        .innerText =
        profile.name;


    document
        .getElementById("dashboardRole")
        .innerText =
        profile.role ||
        "SmartBlood User";


    document
        .getElementById("dashboardBlood")
        .innerText =
        profile.bloodGroup;


    document
        .getElementById("dashboardDistrict")
        .innerText =
        profile.district;


    createProfileContent(profile);

}


/* =====================================================
   PROFILE CONTENT
===================================================== */

function createProfileContent(profile) {

    const profileContent =
        document.getElementById(
            "profileContent"
        );


    profileContent.innerHTML = `

        <div class="profile-grid">

            <div class="profile-item">
                <small>Name</small>
                <strong>${profile.name}</strong>
            </div>

            <div class="profile-item">
                <small>Age</small>
                <strong>${profile.age}</strong>
            </div>

            <div class="profile-item">
                <small>Gender</small>
                <strong>${profile.gender}</strong>
            </div>

            <div class="profile-item">
                <small>Height</small>
                <strong>${profile.height} cm</strong>
            </div>

            <div class="profile-item">
                <small>Weight</small>
                <strong>${profile.weight} kg</strong>
            </div>

            <div class="profile-item">
                <small>Blood Group</small>
                <strong>${profile.bloodGroup}</strong>
            </div>

            <div class="profile-item">
                <small>Phone</small>
                <strong>
                    ${profile.phone || "Not provided"}
                </strong>
            </div>

            <div class="profile-item">
                <small>Email</small>
                <strong>
                    ${profile.email || "Not provided"}
                </strong>
            </div>

            <div class="profile-item">
                <small>District</small>
                <strong>${profile.district}</strong>
            </div>

            <div class="profile-item">
                <small>Address</small>
                <strong>${profile.address}</strong>
            </div>

            <div class="profile-item">
                <small>Health Information</small>
                <strong>
                    ${profile.healthIssues}
                </strong>
            </div>

            <div class="profile-item">
                <small>Role</small>
                <strong>
                    ${profile.role || "Not selected"}
                </strong>
            </div>

        </div>

    `;

}


/* =====================================================
   SHOW PROFILE
===================================================== */

function showProfile() {

    const profileBox =
        document.getElementById(
            "profileBox"
        );


    if (
        profileBox.style.display ===
        "block"
    ) {

        profileBox.style.display =
            "none";

        return;

    }


    profileBox.style.display =
        "block";


    profileBox.scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    const confirmLogout =
        confirm(
            "Do you want to logout?"
        );


    if (!confirmLogout) {

        return;

    }


    showScreen("welcomeScreen");


    alert(
        "You have been logged out."
    );

}


/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener(
    "DOMContentLoaded",
    function() {

        const profile =
            getProfile();


        if (profile) {

            /* Don't automatically skip registration.
               User starts from welcome screen. */

            console.log(
                "Saved SmartBlood profile found."
            );

        }

    }
);
