Rails.application.routes.draw do
  resources :quotes, only: [:index, :create, :show, :update, :destroy]
  resources :authors, only: [:index, :create, :show, :update, :destroy]
end
