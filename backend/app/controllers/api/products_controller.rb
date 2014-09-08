class Api::ProductsController < ApplicationController
  skip_before_action :authenticate_user_from_token!, only: [:index, :show]

  def index
    render json: Product.all
  end

  def show
    render json: Product.find(params[:id])
  end

  def update
    product = Product.find(params[:id])

    if product.update(product_params)
      render json: product
    else
      render json: { errors: product.errors }, status: :unprocessable_entity
    end
  end

  private
  def product_params
    params.require(:product).permit(:title, :description, :price, :image, :stars)
  end
end
