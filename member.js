function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: '/templates/skills/member.html',
    controller: 'SkillsMemberController',
    controllerAs: 'skillsMember',
    scope: {
      member: '=',
      skills: '='
    }
  };
}