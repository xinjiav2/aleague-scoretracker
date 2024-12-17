---
layout: post 
title: Paris
search_exclude: true
permalink: /travel/about
---

<script type=module>
  import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

  fetch(`${pythonURI}/api/people`, fetchOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let users = data;
      console.log(users);

      users.forEach((user) => {
        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = user.name;
        row.appendChild(nameCell);

        let emailCell = document.createElement("td");
        emailCell.textContent = user.id;
        row.appendChild(emailCell);

        let roleCell = document.createElement("td");
        roleCell.textContent = user.role;
        row.appendChild(roleCell);

        let uidCell = document.createElement("td");
        uidCell.textContent = user.uid;
        row.appendChild(uidCell);

        let themeModeCell = document.createElement("td");
        themeModeCell.textContent = user.theme_mode;
        row.appendChild(themeModeCell);

        document.getElementById("userTableBody").appendChild(row);
      });
    });
</script>

<div class="about">
  <h2>InterTravel People</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>ID</th>
        <th>Role</th>
        <th>uid</th>
        <th>Theme Mode</th>
      </tr>
    </thead>
    <tbody id="userTableBody"></tbody>
  </table>
</div>