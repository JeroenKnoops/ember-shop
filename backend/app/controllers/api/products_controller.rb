class Api::ProductsController < ApplicationController

  def index
    sleep 3
    render json: Product.all.includes(:reviews, :category)
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
