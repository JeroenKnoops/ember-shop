Rails.application.routes.draw do
  namespace :api do
    scope :v1 do
      resources :products
      resources :reviews
    end
  end
end
