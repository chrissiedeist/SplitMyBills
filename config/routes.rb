SplitMyBills::Application.routes.draw do
  root :to => "static_pages#home"
  get '/dashboard' => 'static_pages#dashboard'
  get '/guest' => 'sessions#guest'
  
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :destroy] do
    resources :friendships, only: [:create, :destroy ]
  end
  resources :friends, only: [:show, :index]
  
  resources :users, defaults: { format: :json }, only: [ :index, :show ] 
  resources :friendships, only: [:index]
  namespace :api, defaults: { format: :json } do
    resources :bills
    resources :debtors_bills, only: [:update, :index, :show]
  end
  resource :invite_emails, only: [:create]
  resource :reminder_emails, only: [:create]
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
