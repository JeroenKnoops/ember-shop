Rails.application.routes.draw do
  namespace :api do
    scope :v1 do
      resources :products
      resources :reviews
    end
    get :csrf, to: 'csrf#index'
  end
end
