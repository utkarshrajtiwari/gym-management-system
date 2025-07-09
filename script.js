let gymSystem;

class GymManagementSystem {
  constructor() {
    this.currentUser = null;
    this.currentRole = null;
    this.members = [
      {
        id: 1,
        name: "Anjali Gupta",
        email: "anjali@example.com",
        phone: "+91-9876543210",
        membershipType: "gold",
        joinDate: "2024-01-15",
        status: "active",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face",
        age: 28,
        address: "Delhi, India",
        emergencyContact: "+91-9876543211",
        lastPayment: "2024-01-15",
        nextDueDate: "2024-04-15",
      },
      {
        id: 2,
        name: "Rohit Sharma",
        email: "rohit@example.com",
        phone: "+91-9876543211",
        membershipType: "platinum",
        joinDate: "2024-01-10",
        status: "active",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        age: 32,
        address: "Mumbai, India",
        emergencyContact: "+91-9876543212",
        lastPayment: "2024-01-10",
        nextDueDate: "2024-07-10",
      },
    ];

    this.trainers = [
      {
        id: 1,
        name: "Vikram Singh",
        email: "vikram@fitflow.com",
        phone: "+91-9876543220",
        specialization: "Strength Training",
        experience: "5 years",
        status: "active",
        avatar:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face",
        joinDate: "2023-06-15",
        salary: 45000,
        certifications: [
          "Certified Personal Trainer",
          "Strength & Conditioning",
        ],
        rating: 4.8,
      },
    ];

    this.workouts = [
      {
        id: 1,
        name: "Chest & Triceps Blast",
        category: "strength",
        duration: "45 minutes",
        difficulty: "Intermediate",
        exercises: [
          "Bench Press - 4 sets x 8-10 reps",
          "Incline Dumbbell Press - 3 sets x 10-12 reps",
          "Tricep Dips - 3 sets x 12-15 reps",
        ],
        trainer: "Vikram Singh",
        equipment: ["Bench", "Dumbbells", "Cable Machine"],
        calories: 350,
      },
    ];

    this.users = [
      {
        id: 1,
        email: "owner@fitflow.com",
        password: "owner123",
        name: "Rahul Sharma",
        role: "owner",
        phone: "+91-9876543210",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      },
      {
        id: 2,
        email: "trainer@fitflow.com",
        password: "trainer123",
        name: "Priya Singh",
        role: "trainer",
        phone: "+91-9876543211",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face",
      },
      {
        id: 3,
        email: "member@fitflow.com",
        password: "member123",
        name: "Amit Kumar",
        role: "member",
        phone: "+91-9876543212",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
    ];

    this.init();
  }

  init() {
    console.log("🏋️‍♂️ Starting FitFlow...");
    this.setupEventListeners();
    this.showLoginScreen();
    this.updateCurrentDate();
  }

  setupEventListeners() {
    // Role selection
    document.querySelectorAll(".role-card").forEach((card) => {
      card.addEventListener("click", () => {
        this.selectRole(card.dataset.role);
      });
    });

    // Login form
    document
      .getElementById("loginFormElement")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleLogin();
      });

    // Register form
    document
      .getElementById("registerFormElement")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleRegister();
      });

    // Form toggles
    document.getElementById("showRegister").addEventListener("click", () => {
      this.showRegisterForm();
    });

    document.getElementById("backToLogin").addEventListener("click", () => {
      this.showLoginForm();
    });

    document.getElementById("backToRoles").addEventListener("click", () => {
      this.showRoleSelection();
    });

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
      this.logout();
    });

    // Navigation
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", () => {
        this.navigate(item.dataset.page);
      });
    });
  }

  updateCurrentDate() {
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    const dateElement = document.getElementById("currentDate");
    if (dateElement) {
      dateElement.textContent = dateStr;
    }
  }

  showLoginScreen() {
    document.getElementById("loginScreen").style.display = "flex";
    document.getElementById("mainApp").style.display = "none";
  }

  showRoleSelection() {
    document.getElementById("roleSelection").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
  }

  selectRole(role) {
    this.currentRole = role;
    const titles = {
      owner: "Gym Owner",
      trainer: "Trainer",
      member: "Member",
    };

    document.getElementById("loginTitle").textContent = titles[role] + " Login";
    document.getElementById("registerTitle").textContent =
      titles[role] + " Registration";
    this.showLoginForm();
  }

  showLoginForm() {
    document.getElementById("roleSelection").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
  }

  showRegisterForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
  }

  handleLogin() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const user = this.users.find(
      (u) =>
        u.email === email &&
        u.password === password &&
        u.role === this.currentRole
    );

    if (user) {
      this.loginUser(user);
    } else {
      this.showNotification("Invalid credentials!", "error");
    }
  }

  handleRegister() {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const phone = document.getElementById("registerPhone").value;
    const password = document.getElementById("registerPassword").value;

    if (this.users.find((u) => u.email === email)) {
      this.showNotification("Email already exists!", "error");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      password,
      role: this.currentRole,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    };

    this.users.push(newUser);
    this.loginUser(newUser);
    this.showNotification("Registration successful!", "success");
  }

  loginUser(user) {
    this.currentUser = user;
    this.currentRole = user.role;

    // Update UI
    document.getElementById("sidebarUserName").textContent = user.name;
    document.getElementById("sidebarUserRole").textContent =
      user.role.charAt(0).toUpperCase() + user.role.slice(1);
    document.getElementById("headerUserName").textContent = user.name;
    document.getElementById("headerUserRole").textContent =
      "Gym " + user.role.charAt(0).toUpperCase() + user.role.slice(1);
    document.getElementById("welcomeMessage").textContent =
      "Welcome Back, " + user.name.split(" ")[0];
    document.getElementById("sidebarUserAvatar").src = user.avatar;
    document.getElementById("headerUserAvatar").src = user.avatar;

    // Show main app
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("mainApp").style.display = "flex";

    this.setupRoleBasedNavigation();
    this.navigate("dashboard");
    this.showNotification("Welcome back, " + user.name + "!", "success");
  }

  logout() {
    this.currentUser = null;
    this.currentRole = null;
    document.getElementById("loginFormElement").reset();
    document.getElementById("registerFormElement").reset();
    this.showLoginScreen();
    this.showRoleSelection();
    this.showNotification("Logged out successfully!", "success");
  }

  setupRoleBasedNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
      item.style.display = "flex";
    });

    if (this.currentRole === "member") {
      navItems.forEach((item) => {
        const page = item.dataset.page;
        if (["trainers", "billing", "reports", "settings"].includes(page)) {
          item.style.display = "none";
        }
      });
    } else if (this.currentRole === "trainer") {
      navItems.forEach((item) => {
        const page = item.dataset.page;
        if (["billing", "reports", "settings"].includes(page)) {
          item.style.display = "none";
        }
      });
    }
  }

  navigate(page) {
    // Update active nav
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
      if (item.dataset.page === page) {
        item.classList.add("active");
      }
    });

    // Hide all pages
    document.querySelectorAll(".page-content").forEach((content) => {
      content.classList.remove("active");
    });

    // Show selected page
    const pageContent = document.getElementById(page + "Content");
    if (pageContent) {
      pageContent.classList.add("active");
      this.loadPageContent(page);
    }
  }

  loadPageContent(page) {
    switch (page) {
      case "dashboard":
        this.loadDashboard();
        break;
      case "members":
        this.loadMembers();
        break;
      case "workout":
        this.loadWorkouts();
        break;
      case "diet":
        this.loadDietPlans();
        break;
      case "schedule":
        this.loadSchedule();
        break;
      case "trainers":
        this.loadTrainers();
        break;
      case "billing":
        this.loadBilling();
        break;
      case "reports":
        this.loadReports();
        break;
      case "settings":
        this.loadSettings();
        break;
    }
  }

  loadDashboard() {
    // Update stats
    document.getElementById("totalMembers").textContent = this.members.length;
    document.getElementById("activeTrainers").textContent =
      this.trainers.filter((t) => t.status === "active").length;
    document.getElementById("todayCheckins").textContent =
      Math.floor(Math.random() * 50) + 100;

    // Load recent activities
    const activities = [
      {
        icon: "fas fa-user-plus",
        title: "New Member Registration",
        description: "Priya Sharma joined Gold membership",
        time: "5 minutes ago",
      },
      {
        icon: "fas fa-dumbbell",
        title: "Workout Completed",
        description: "Rahul Kumar finished chest routine",
        time: "12 minutes ago",
      },
      {
        icon: "fas fa-money-bill",
        title: "Payment Received",
        description: "₹3,000 from Anjali Gupta",
        time: "1 hour ago",
      },
    ];

    const activityList = document.getElementById("activityList");
    if (activityList) {
      activityList.innerHTML = activities
        .map(
          (activity) => `
        <div class="activity-item">
          <div class="activity-icon">
            <i class="${activity.icon}"></i>
          </div>
          <div class="activity-content">
            <strong>${activity.title}</strong>
            <span>${activity.description}</span>
            <small>${activity.time}</small>
          </div>
        </div>
      `
        )
        .join("");
    }
  }

  loadMembers() {
    this.renderMembersGrid();
  }

  renderMembersGrid() {
    const membersGrid = document.getElementById("membersGrid");
    if (!membersGrid) return;

    membersGrid.innerHTML = this.members
      .map(
        (member) => `
      <div class="card member-card">
        <div class="card-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${member.avatar}" alt="${member.name}" 
                 style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #ff6b35;">
            <div>
              <div class="card-title">${member.name}</div>
              <div style="color: #a0a0b0; font-size: 12px;">${
                member.email
              }</div>
            </div>
          </div>
          <span class="status-badge ${member.status}">${member.status}</span>
        </div>
        
        <div style="margin: 15px 0;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #a0a0b0; font-size: 14px;">Membership:</span>
            <span style="color: #ff6b35; font-weight: 600; text-transform: capitalize;">${
              member.membershipType
            }</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #a0a0b0; font-size: 14px;">Phone:</span>
            <span style="color: #ffffff; font-size: 14px;">${
              member.phone
            }</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #a0a0b0; font-size: 14px;">Join Date:</span>
            <span style="color: #ffffff; font-size: 14px;">${new Date(
              member.joinDate
            ).toLocaleDateString()}</span>
          </div>
        </div>

        <div class="card-actions">
          <button class="card-btn" onclick="gymSystem.viewMemberDetails(${
            member.id
          })">
            <i class="fas fa-eye"></i> View
          </button>
          <button class="card-btn" onclick="gymSystem.editMember(${member.id})">
            <i class="fas fa-edit"></i> Edit
          </button>
          ${
            this.currentRole === "owner"
              ? `
            <button class="card-btn" onclick="gymSystem.deleteMember(${member.id})">
              <i class="fas fa-trash"></i> Delete
            </button>
          `
              : ""
          }
        </div>
      </div>
    `
      )
      .join("");
  }

  viewMemberDetails(memberId) {
    const member = this.members.find((m) => m.id === memberId);
    if (!member) return;

    const modalContent = `
      <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
        <img src="${member.avatar}" alt="${member.name}" 
             style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #ff6b35;">
        <div>
          <h2 style="color: #ffffff; margin-bottom: 5px;">${member.name}</h2>
          <span class="status-badge ${member.status}">${member.status}</span>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
        <div>
          <h4 style="color: #ff6b35; margin-bottom: 10px;">Contact Information</h4>
          <p><strong>Email:</strong> ${member.email}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Emergency:</strong> ${member.emergencyContact}</p>
          <p><strong>Address:</strong> ${member.address}</p>
        </div>
        
        <div>
          <h4 style="color: #ff6b35; margin-bottom: 10px;">Membership Details</h4>
          <p><strong>Type:</strong> ${member.membershipType}</p>
          <p><strong>Join Date:</strong> ${new Date(
            member.joinDate
          ).toLocaleDateString()}</p>
          <p><strong>Last Payment:</strong> ${new Date(
            member.lastPayment
          ).toLocaleDateString()}</p>
          <p><strong>Next Due:</strong> ${new Date(
            member.nextDueDate
          ).toLocaleDateString()}</p>
        </div>
      </div>
    `;

    this.createModal("Member Details", modalContent, "large");
  }

  editMember(memberId) {
    this.showNotification("Edit member feature - Coming soon!", "info");
  }

  deleteMember(memberId) {
    const member = this.members.find((m) => m.id === memberId);
    if (!member) return;

    if (confirm(`Delete ${member.name}?`)) {
      this.members = this.members.filter((m) => m.id !== memberId);
      this.renderMembersGrid();
      this.showNotification(`${member.name} deleted!`, "success");
    }
  }

  loadWorkouts() {
    const workoutContainer = document.getElementById("workoutRoutines");
    if (!workoutContainer) return;

    workoutContainer.innerHTML = this.workouts
      .map(
        (workout) => `
      <div class="card workout-card">
        <div class="card-header">
          <div class="card-title">${workout.name}</div>
          <span class="status-badge ${workout.difficulty.toLowerCase()}">${
          workout.difficulty
        }</span>
        </div>
        
        <div style="margin: 15px 0;">
          <p><strong>Category:</strong> ${workout.category}</p>
          <p><strong>Duration:</strong> ${workout.duration}</p>
          <p><strong>Trainer:</strong> ${workout.trainer}</p>
          <p><strong>Calories:</strong> ${workout.calories}</p>
        </div>

        <div class="card-actions">
          <button class="card-btn" onclick="gymSystem.viewWorkoutDetails(${
            workout.id
          })">
            <i class="fas fa-eye"></i> View Details
          </button>
        </div>
      </div>
    `
      )
      .join("");
  }

  viewWorkoutDetails(workoutId) {
    const workout = this.workouts.find((w) => w.id === workoutId);
    if (!workout) return;

    const modalContent = `
      <h2>${workout.name}</h2>
      <p><strong>Category:</strong> ${workout.category}</p>
      <p><strong>Duration:</strong> ${workout.duration}</p>
      <p><strong>Difficulty:</strong> ${workout.difficulty}</p>
      <p><strong>Trainer:</strong> ${workout.trainer}</p>
      <p><strong>Calories:</strong> ${workout.calories}</p>
      
      <h4>Exercises:</h4>
      <ul>
        ${workout.exercises.map((exercise) => `<li>${exercise}</li>`).join("")}
      </ul>
      
      <h4>Equipment:</h4>
      <ul>
        ${workout.equipment.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;

    this.createModal("Workout Details", modalContent, "large");
  }

  loadDietPlans() {
    this.showNotification("Diet plans loaded!", "info");
  }

  loadSchedule() {
    this.showNotification("Schedule loaded!", "info");
  }

  loadTrainers() {
    const trainersGrid = document.getElementById("trainersGrid");
    if (!trainersGrid) return;

    trainersGrid.innerHTML = this.trainers
      .map(
        (trainer) => `
      <div class="card trainer-card">
        <div class="card-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${trainer.avatar}" alt="${trainer.name}" 
                 style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #ff6b35;">
            <div>
              <div class="card-title">${trainer.name}</div>
              <div style="color: #a0a0b0; font-size: 12px;">${
                trainer.email
              }</div>
            </div>
          </div>
          <span class="status-badge ${trainer.status}">${trainer.status}</span>
        </div>
        
        <div style="margin: 15px 0;">
          <p><strong>Specialization:</strong> ${trainer.specialization}</p>
          <p><strong>Experience:</strong> ${trainer.experience}</p>
          <p><strong>Rating:</strong> ⭐ ${trainer.rating}</p>
          <p><strong>Salary:</strong> ₹${trainer.salary.toLocaleString()}</p>
        </div>

        <div class="card-actions">
          <button class="card-btn" onclick="gymSystem.viewTrainerDetails(${
            trainer.id
          })">
            <i class="fas fa-eye"></i> View
          </button>
        </div>
      </div>
    `
      )
      .join("");
  }

  viewTrainerDetails(trainerId) {
    const trainer = this.trainers.find((t) => t.id === trainerId);
    if (!trainer) return;

    const modalContent = `
      <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
        <img src="${trainer.avatar}" alt="${trainer.name}" 
             style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #ff6b35;">
        <div>
          <h2 style="color: #ffffff;">${trainer.name}</h2>
          <span class="status-badge ${trainer.status}">${trainer.status}</span>
        </div>
      </div>
      
      <div>
        <h4 style="color: #ff6b35;">Professional Details</h4>
        <p><strong>Email:</strong> ${trainer.email}</p>
        <p><strong>Phone:</strong> ${trainer.phone}</p>
        <p><strong>Specialization:</strong> ${trainer.specialization}</p>
        <p><strong>Experience:</strong> ${trainer.experience}</p>
        <p><strong>Rating:</strong> ⭐ ${trainer.rating}</p>
        <p><strong>Salary:</strong> ₹${trainer.salary.toLocaleString()}/month</p>
        
        <h4 style="color: #ff6b35;">Certifications</h4>
        <ul>
          ${trainer.certifications.map((cert) => `<li>${cert}</li>`).join("")}
        </ul>
      </div>
    `;

    this.createModal("Trainer Details", modalContent, "large");
  }

  loadBilling() {
    this.showNotification("Billing loaded!", "info");
  }

  loadReports() {
    this.showNotification("Reports loaded!", "info");
  }

  loadSettings() {
    this.showNotification("Settings loaded!", "info");
  }

  showAddMemberModal() {
    const modalContent = `
      <form id="addMemberForm">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-bottom: 20px;">
          <div>
            <label>Full Name</label>
            <input type="text" id="memberName" placeholder="Enter name" required>
          </div>
          <div>
            <label>Email</label>
            <input type="email" id="memberEmail" placeholder="Enter email" required>
          </div>
          <div>
            <label>Phone</label>
            <input type="tel" id="memberPhone" placeholder="Enter phone" required>
          </div>
          <div>
            <label>Age</label>
            <input type="number" id="memberAge" placeholder="Enter age" min="16" max="80" required>
          </div>
          <div>
            <label>Membership</label>
            <select id="membershipType" required>
              <option value="">Select</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
          </div>
          <div>
            <label>Emergency Contact</label>
            <input type="tel" id="emergencyContact" placeholder="Emergency number" required>
          </div>
        </div>
        <div>
          <label>Address</label>
          <textarea id="memberAddress" placeholder="Enter address" rows="3" required></textarea>
        </div>
        <button type="submit" style="width: 100%; margin-top: 15px;">Add Member</button>
      </form>
    `;

    this.createModal("Add New Member", modalContent, "large");

    document.getElementById("addMemberForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.addMember();
    });
  }

  addMember() {
    const newMember = {
      id: Date.now(),
      name: document.getElementById("memberName").value,
      email: document.getElementById("memberEmail").value,
      phone: document.getElementById("memberPhone").value,
      age: parseInt(document.getElementById("memberAge").value),
      membershipType: document.getElementById("membershipType").value,
      emergencyContact: document.getElementById("emergencyContact").value,
      address: document.getElementById("memberAddress").value,
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face",
      lastPayment: new Date().toISOString().split("T")[0],
      nextDueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    };

    if (this.members.find((m) => m.email === newMember.email)) {
      this.showNotification("Email already exists!", "error");
      return;
    }

    this.members.push(newMember);
    this.renderMembersGrid();
    this.closeAllModals();
    this.showNotification(`${newMember.name} added successfully!`, "success");
  }

  showQuickActions() {
    const modalContent = `
      <div style="display: grid; gap: 10px;">
        <button class="primary-btn" onclick="gymSystem.showAddMemberModal(); gymSystem.closeAllModals();">
          <i class="fas fa-user-plus"></i> Add Member
        </button>
        <button class="primary-btn" onclick="gymSystem.generateReport(); gymSystem.closeAllModals();">
          <i class="fas fa-chart-bar"></i> Generate Report
        </button>
        <button class="primary-btn" onclick="gymSystem.navigate('schedule'); gymSystem.closeAllModals();">
          <i class="fas fa-calendar"></i> View Schedule
        </button>
        <button class="primary-btn" onclick="gymSystem.downloadBackup(); gymSystem.closeAllModals();">
          <i class="fas fa-download"></i> Backup Data
        </button>
      </div>
    `;

    this.createModal("Quick Actions", modalContent);
  }

  generateReport() {
    const modalContent = `
      <div style="text-align: center;">
        <h3 style="color: #ff6b35; margin-bottom: 20px;">Member Statistics</h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 20px;">
          <div style="background: rgba(42, 42, 62, 0.6); padding: 15px; border-radius: 8px;">
            <h4 style="color: #ff6b35;">Total Members</h4>
            <div style="font-size: 24px; color: #fff;">${
              this.members.length
            }</div>
          </div>
          <div style="background: rgba(42, 42, 62, 0.6); padding: 15px; border-radius: 8px;">
            <h4 style="color: #ff6b35;">Active Members</h4>
            <div style="font-size: 24px; color: #4ade80;">${
              this.members.filter((m) => m.status === "active").length
            }</div>
          </div>
          <div style="background: rgba(42, 42, 62, 0.6); padding: 15px; border-radius: 8px;">
            <div style="font-size: 24px; color: #ffd700;">${
              this.members.filter((m) => m.membershipType === "gold").length
            }</div>
          </div>
        </div>
        
        <p style="color: #a0a0b0; font-size: 12px;">Report generated on ${new Date().toLocaleDateString()}</p>
      </div>
    `;

    this.createModal("Member Report", modalContent, "large");
  }

  downloadBackup() {
    const backupData = {
      members: this.members,
      trainers: this.trainers,
      workouts: this.workouts,
      users: this.users,
      timestamp: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `fitflow_backup_${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();

    URL.revokeObjectURL(url);
    this.showNotification("Backup downloaded!", "success");
  }

  createModal(title, content, size = "medium") {
    // Remove existing modals
    this.closeAllModals();

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.style.display = "block";
    modal.innerHTML = `
      <div class="modal-content" style="max-width: ${
        size === "large" ? "800px" : "600px"
      };">
        <div class="modal-header">
          <h3>${title}</h3>
          <span class="close" onclick="gymSystem.closeAllModals()">&times;</span>
        </div>
        <div class="modal-body">${content}</div>
      </div>
    `;

    document.body.appendChild(modal);

    // Close on outside click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeAllModals();
      }
    });

    return modal;
  }

  closeAllModals() {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.remove();
    });
  }

  showNotification(message, type = "info") {
    // Remove existing notifications
    document.querySelectorAll(".notification").forEach((n) => n.remove());

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: none; border: none; color: white; font-size: 18px; cursor: pointer;">×</button>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 4000);
  }
}

// Global functions for HTML onclick handlers
function showAddMemberModal() {
  if (gymSystem) {
    gymSystem.showAddMemberModal();
  }
}

function showQuickActions() {
  if (gymSystem) {
    gymSystem.showQuickActions();
  }
}

function showAddWorkoutModal() {
  if (gymSystem) {
    gymSystem.showNotification("Add workout feature - Coming soon!", "info");
  }
}

function showAddDietModal() {
  if (gymSystem) {
    gymSystem.showNotification("Add diet plan feature - Coming soon!", "info");
  }
}

function showAddScheduleModal() {
  if (gymSystem) {
    gymSystem.showNotification("Add schedule feature - Coming soon!", "info");
  }
}

function showAddTrainerModal() {
  if (gymSystem) {
    gymSystem.showNotification("Add trainer feature - Coming soon!", "info");
  }
}

function showCreateBillModal() {
  if (gymSystem) {
    gymSystem.showNotification("Create bill feature - Coming soon!", "info");
  }
}

function generateMemberReport() {
  if (gymSystem) {
    gymSystem.generateReport();
  }
}

function generateRevenueReport() {
  if (gymSystem) {
    gymSystem.showNotification("Revenue report - Coming soon!", "info");
  }
}

function generateAttendanceReport() {
  if (gymSystem) {
    gymSystem.showNotification("Attendance report - Coming soon!", "info");
  }
}

function generateEquipmentReport() {
  if (gymSystem) {
    gymSystem.showNotification("Equipment report - Coming soon!", "info");
  }
}

function updateGymInfo() {
  if (gymSystem) {
    gymSystem.showNotification("Gym info updated!", "success");
  }
}

function changePassword() {
  if (gymSystem) {
    gymSystem.showNotification("Password change - Coming soon!", "info");
  }
}

function enable2FA() {
  if (gymSystem) {
    gymSystem.showNotification("2FA setup - Coming soon!", "info");
  }
}

function downloadBackup() {
  if (gymSystem) {
    gymSystem.downloadBackup();
  }
}

function exportReport() {
  if (gymSystem) {
    gymSystem.showNotification("Report export - Coming soon!", "info");
  }
}

function generateQuickReport() {
  if (gymSystem) {
    gymSystem.generateReport();
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("🏋️‍♂️ DOM loaded, starting FitFlow...");
  try {
    gymSystem = new GymManagementSystem();
    console.log("✅ FitFlow initialized successfully! ");
  } catch (error) {
    console.error("❌ Error:", error);
  }
});
