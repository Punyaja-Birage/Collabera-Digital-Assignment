import json
from django.core.management.base import BaseCommand
from your_app.models import Movie

class Command(BaseCommand):
    help = 'Import movies from JSON file'

    def handle(self, *args, **kwargs):
        file_path = 'movies_project\movies_frontend\public\movies.json'  # Replace with the actual path to your JSON file

        with open(file_path, 'r') as file:
            movies_data = json.load(file)

        for entry in data:
                date = datetime.strptime(entry['date'], '%Y-%m-%dT%H:%M:%S.%fZ').date()
                for movie_data in entry['movies']:
                    metacritic_rating = None
                    for rating in movie_data.get('Ratings', []):
                        if rating['source'] == 'Metacritic':
                            metacritic_rating = int(rating['value'].split('/')[0])
                            break
                    Movie.objects.create(
                        date=date,  # Use the parsed date
                        title=movie_data['title'],
                        poster=movie_data['poster'],
                        genre=', '.join(movie_data['genre']),
                        rated=movie_data['rated'],
                        year=movie_data['year'],
                        metacritic=metacritic_rating,
                        runtime=movie_data['runtime']
                    )
        self.stdout.write(self.style.SUCCESS('Movies imported successfully'))
