from django.test import TestCase
from .models import Team, User, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass', team=self.team)
        self.activity = Activity.objects.create(user=self.user, type='Run', duration=30, calories=300)
        self.workout = Workout.objects.create(name='Test Workout', description='Test Desc')
        self.leaderboard = Leaderboard.objects.create(team=self.team, points=100)

    def test_team_str(self):
        self.assertEqual(str(self.team), 'Test Team')
    def test_user_str(self):
        self.assertEqual(self.user.username, 'testuser')
    def test_activity_str(self):
        self.assertIn('testuser', str(self.activity))
    def test_workout_str(self):
        self.assertEqual(str(self.workout), 'Test Workout')
    def test_leaderboard_str(self):
        self.assertIn('Test Team', str(self.leaderboard))
