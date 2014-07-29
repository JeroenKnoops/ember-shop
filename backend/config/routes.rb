Rails.application.routes.draw do
  namespace :api do
    scope :v1 do
      resources :products
    end
  end
end
