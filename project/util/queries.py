from util import data_manager


def get_everything(table_name):
    select = f' SELECT * FROM {table_name}'
    all_data = data_manager.execute_select(select)
    return all_data

def get_table_order_by_element(table, element):
    return data_manager.execute_select(
        f"""
        SELECT * FROM {table}
        ORDER BY {element} ASC;
        """
    )

def get_table_by_element_order_by_element(table, where_element, get_by, order_by):
    return data_manager.execute_select(
        f"""
        SELECT * FROM {table}
        WHERE {where_element} = {get_by}
        ORDER BY {order_by} ASC;
        """
    )

def get_everything_by_id(table_name, column_name, id):
    """
    """
    select = f'''         
        SELECT * FROM {table_name}
        WHERE {column_name} = {id}'''
    all_data_by_id = data_manager.execute_select(select)

    return all_data_by_id


def add_user(user_name,email,password,registration_time):
    data_manager.execute_insert( 
                """
                INSERT into 
                users (user_name, email, password, registration_time)
                values 
                (%(user_name)s, %(email)s, %(password)s, %(registration_time)s)"""
                , {'user_name': user_name, 'email': email, 'password':password,
                 'registration_time': registration_time})

def users_emails():
    users_emails = data_manager.execute_select(
        """
        SELECT email FROM users
        """)
    return users_emails

def user_data(email):
    user_data = data_manager.execute_select(
        """
        SELECT * FROM users
        WHERE email = %(email)s
        ;
        """
        , {"email": email}, fetchall=None)
    return user_data

def add_board(title):
    data_manager.execute_insert( 
                """
                INSERT into 
                boards (title)
                values 
                (%(title)s)"""
                , {'title': title})


def add_column(board_id, title, column_order):
    data_manager.execute_insert( 
                """
                INSERT into 
                columns (board_id, title, column_order)
                values 
                (%(board_id)s, %(title)s, %(column_order)s)"""
                , {'board_id': board_id, 'title': title, 'column_order': column_order})


def add_card(column_id, title, card_order):
    return data_manager.execute_select( 
                """
                INSERT into 
                cards (column_id, title, card_order)
                values 
                (%(column_id)s, %(title)s, %(card_order)s)
                RETURNING cards.id"""
                , {'column_id': column_id, 'title': title, 'card_order': card_order})


def delete_card(id):
    data_manager.execute_insert(
        """
        DELETE from cards
        WHERE id = %(id)s
        """
        , {'id':id})

def delete_column(id):
    data_manager.execute_insert(
        """
        DELETE from columns
        WHERE id = %(id)s
        """
        , {'id':id})

def delete_board(id):
    data_manager.execute_insert(
        """
        DELETE from columns
        WHERE board_id = %(id)s;
        
        DELETE from boards
        WHERE id = %(id)s
        """
        , {'id':id})


def updata_board(id, new_title):
    select = f'''
    UPDATE boards SET
    title = '{new_title}'
    WHERE id = {id}
    '''
    return data_manager.execute_insert(select)


def updata_column(id, new_title):
    select = f'''
    UPDATE columns SET
    title = '{new_title}'
    WHERE id = {id}
    '''
    return data_manager.execute_insert(select)

def updata_card(id, new_title):
    select = f'''
    UPDATE cards SET
    title = '{new_title}'
    WHERE id = {id}
    '''
    return data_manager.execute_insert(select)


def switch_columnId(column_id, card_id, card_order):
    select = f'''
        UPDATE cards SET
        column_id = {column_id}, card_order = {card_order}
        WHERE id = {card_id}
        '''
    data_manager.execute_insert(select) 

