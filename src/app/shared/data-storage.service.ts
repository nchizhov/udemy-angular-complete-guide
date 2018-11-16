import {Injectable} from '@angular/core';
import {RecipeService} from '../recipies/recipe.service';
import {Recipe} from '../recipies/recipe.model';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {}

  storeRecipes() {
    /*return this.httpClient.put('https://ng-recipe-4afda.firebaseio.com/recipes.json', this.recipeService.getRecipes(),
      {
        observe: 'body',
        headers: new HttpHeaders().set('Authorization', 'sdfgsdfgsdgf'),
        params: new HttpParams().set('auth', token)
      });*/

    const req = new HttpRequest('PUT', 'https://ng-recipe-4afda.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
      reportProgress: true
    });
    return this.httpClient.request(req);
  }

  getRecipes() {
    // this.httpClient.get<Recipe[]>('https://ng-recipe-4afda.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get<Recipe[]>('https://ng-recipe-4afda.firebaseio.com/recipes.json', {
      observe: 'body'
    })
      .pipe(
        map(
          (recipes) => {
            for (const recipe of recipes) {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
            return recipes;
          }
        )
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
