
const emailDomains = {
    public: [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "live.com",
        "aol.com",
        "icloud.com",
        "me.com",
        "protonmail.com",
        "zoho.com",
        "ymail.com"
    ],
}
const row_names = []


window.addEventListener("DOMContentLoaded", function () {
    const contactsContainer = document.querySelector(".contacts");

    for (let i = 0; i < this.localStorage.length; i++) {
        const key = this.localStorage.key(i)
        const contact = JSON.parse(localStorage.getItem(key));
        try {
            if (contact && contact.name && contact.email && contact.phone) {

                contactsContainer.innerHTML += `
                <div class="row" data-name="${key}" style="display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 25px;
                    border: 5px solid brown;
                    background-color: bisque;
                    width: 100%;
                    height: 100px;">
                    <div class="con_num">#${key} => </div>
                    <div class="name">${contact.name}</div>
                    <div class="phone">${contact.phone}</div>
                    <div class="email">${contact.email}</div>
                    <div class="icon-container">
                        <button class="delete" style="border: none; background-color: bisque; cursor:pointer">
                            <img class="icon" src="Delete.png" style="width: 30px; height: 28px;" alt="delete">
                        </button>
                    </div>
                </div>`;
            }
            document.querySelector(".contacts").addEventListener("click", function (e) {
                if (e.target.classList.contains("icon")) {
                    const row = e.target.closest(".row");
                    const contactName = row.dataset.name;

                    localStorage.removeItem(contactName);
                    row.remove();
                }
            });
        } catch (error) {

            continue
        }
    }



    document.getElementsByClassName("Add")[0].addEventListener("click", function (e) {
        e.preventDefault();
        function add() {
            let con_num = document.querySelector("#con_num").value.trim();
            let name = document.querySelector("#name").value;
            let email = document.querySelector("#email").value;
            let phone_no = document.querySelector("#phone").value;
            if (localStorage.getItem(con_num)) {
                alert("This unique code is already in use!")
                return;
            }
            let tot_chararacters_in_phone_number = 0
            let first_number;
            let domain;
            let hasDomain = false;
            if (name && email && phone_no && con_num) {
                if (/^\d+$/.test(con_num)) {
                    alert("Only characters or alphanumeric values allowed! Pure numbers are not allowed as unique IDs.");
                    return;
                }
                else {
                    let words = email.split("@")
                    domain = words[1];
                    for (let domains in emailDomains) {
                        for (let items of emailDomains[domains]) {
                            if (domain == items) {
                                hasDomain = true;
                                break;
                            }
                        }
                    }
                    if (!hasDomain) {
                        alert("Please enter the correct email domain")
                    }
                    else {
                        tot_chararacters_in_phone_number = phone_no.length;
                        first_number = phone_no[0]
                        if (tot_chararacters_in_phone_number > 10 || tot_chararacters_in_phone_number < 10 || (first_number < 6 || first_number > 9)) {
                            alert("Invalid phone number as per Indian phone number standards")
                        }
                        else {
                            row_names.push(con_num)
                            localStorage.setItem(con_num, JSON.stringify({ name, phone: phone_no, email }));

                            document.querySelector(".contacts").innerHTML += `
                        <div class="row" data-name="${con_num}" style="display: flex;
                                                                    justify-content: space-between;
                                                                    align-items: center;
                                                                    gap: 25px;
                                                                    border: 5px solid brown;
                                                                    background-color: bisque;
                                                                    width: 100%;
                                                                    height: 100px;">
                    <div class="con_num">#${con_num} => </div>
                    <div class="name">${name}</div>
                    <div class="phone">${phone_no}</div>
                    <div class="email">${email}</div>
                    <div class="icon-container">
                        <button class="delete" style="border: none; background-color: bisque; cursor:pointer">
                            <img class="icon" src="Delete.png" style="width: 30px; height: 28px;" alt="delete">
                        </button>
                    </div>
                </div>`;

                            document.querySelector(".contacts").addEventListener("click", function (e) {
                                if (e.target.classList.contains("icon")) {
                                    const row = e.target.closest(".row");
                                    const contactName = row.dataset.name;

                                    localStorage.removeItem(contactName);
                                    row.remove();
                                }
                            });
                        }
                    }
                }
            }

        }
        add()


    })

})
