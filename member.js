function skillsMember(): void {
  // Get the member ID from the URL
  const memberId = window.location.pathname.split('/')[2];
  // Get the member's skills
  const skills = getMemberSkills(memberId);
  // Display the skills
  displaySkills(skills);
}